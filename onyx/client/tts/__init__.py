# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
from abc import abstractmethod

import onyx, importlib
from onyx.config import Config

class TTS(object):

	def __init__(self, lang):
		self.lang = Config.LANG
		self.voice = None
		self.filename = '/tmp/tts.wav'

	def init(self, ws):
		self.ws = ws

	@abstractmethod
	def execute(self, sentence):
		pass

class TTSFactory(object):
    from onyx.client.tts.google_tts import GoogleTTS

    CLASSES = {
        "google": GoogleTTS
    }

    @staticmethod
    def create():

        module = Config.TTS
        lang = Config.LANG
        classe = TTSFactory.CLASSES.get(module)

        tts = classe(lang)

        return tts
