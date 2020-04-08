# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
import time
import json
from multiprocessing.pool import ThreadPool

from pyee import EventEmitter
from websocket import WebSocketApp

from onyx.config import Config
from onyx.sockyx.message import Message
from onyx.utils.log import getLogger

from onyx.client.tts import TTSFactory
tts = TTSFactory.create()

LOG = getLogger(__name__)

def validate_param(value, name):
    if not value:
        raise ValueError("Missing or empty %s in onyx.cfg " % name)

class WebsocketClient(object):
    def __init__(self, host=Config.WS_HOST, port=Config.WS_PORT,
                 route=Config.WS_ROUTE, ssl=Config.WS_SSL):

        validate_param(host, "websocket.host")
        validate_param(port, "websocket.port")
        validate_param(route, "websocket.route")

        self.build_url(host, port, route, ssl)
        self.emitter = EventEmitter()
        self.client = self.create_client()
        self.pool = ThreadPool(10)
        self.retry = 5

    def build_url(self, host, port, route, ssl):
        scheme = "wss" if ssl else "ws"
        self.url = scheme + "://" + host + ":" + str(port) + route

    def create_client(self):
        return WebSocketApp(self.url,
                            on_open=self.on_open, on_close=self.on_close,
                            on_error=self.on_error, on_message=self.on_message)

    def on_open(self, ws):
        LOG.info("Connected")
        self.emitter.emit("open")

    def on_close(self, ws):
        self.emitter.emit("close")

    def on_error(self, ws, error):
        try:
            self.emitter.emit('error', error)
            self.client.close()
        except Exception as e:
            LOG.error(repr(e))
        LOG.warn("WS Client will reconnect in %d seconds." % self.retry)
        time.sleep(self.retry)
        self.retry = min(self.retry * 2, 60)
        self.client = self.create_client()
        self.run_forever()

    def on_message(self, ws, message):
        self.emitter.emit('message', message)
        parsed_message = Message.deserialize(message)
        self.pool.apply_async(
            self.emitter.emit, (parsed_message.type, parsed_message))

    def emit(self, message):
        if (not self.client or not self.client.sock or
                not self.client.sock.connected):
            return
        if hasattr(message, 'serialize'):
            self.client.send(message.serialize())
        else:
            self.client.send(json.loads(message.__dict__))

    def on(self, event_name, func):
        self.emitter.on(event_name, func)

    def once(self, event_name, func):
        self.emitter.once(event_name, func)

    def remove(self, event_name, func):
        self.emitter.remove_listener(event_name, func)

    def run_forever(self):
        self.client.run_forever()

    def close(self):
        self.client.close()

