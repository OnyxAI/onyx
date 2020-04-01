# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
import onyx, sys, os, time

import threading
from threading import Thread

from onyx.config import get_config
from onyx.utils.log import getLogger
from onyx.sockyx.client.ws import WebsocketClient
from onyx.sockyx.message import Message

global ws

config = get_config('onyx')
LOG = getLogger('Client')

def handle_speak(event):
    utterance = event.data.get('utterance')
    print(">> " + utterance)

def handle_test(event):
    print(event.data['utterances'][0])

def handle_finish(event):
    print("Finish")

def connect():
    # Once the websocket has connected, just watch it for speak events
    ws.run_forever()

ws = WebsocketClient()
ws.on('speak', handle_speak)
ws.on('onyx_recognizer:utterance', handle_test)
ws.on('finish', handle_finish)
event_thread = Thread(target=connect)
event_thread.setDaemon(True)
event_thread.start()

def cli():
    while True:
        try:
            time.sleep(1.5)
            result = input('You: ')

            print ("Sending message...")
            payload = {
                'utterances': [result]
            }
            ws.emit(Message('onyx_recognizer:utterance', payload))
            ws.emit(Message('speak', result))

        except (KeyboardInterrupt, EOFError, SystemExit):
            break

if __name__ == "__main__":
    cli()

