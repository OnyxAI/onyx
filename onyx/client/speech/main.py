# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
from onyx.client.speech.assets import snowboydecoder
import onyx, importlib, wave, pyaudio, sys, os, time
from onyx.config import get_config
from onyx.utils import play_wav, play_mp3
from onyx.utils.log import getLogger
from onyx.client.stt import STTFactory
from onyx.client.tts import TTSFactory

config = get_config('onyx')

import threading
from threading import Thread

from onyx.sockyx.client.ws import WebsocketClient
from onyx.sockyx.message import Message


stt = STTFactory.create()
tts = TTSFactory.create()
token = config.get('Base', 'api_token')

LOG = getLogger('SpeechClient')
import speech_recognition as sr


def handle_speak(event):
    utterance = event.data.get('utterance')
    tts.execute(utterance)


def connect():
    ws.run_forever()

ws = WebsocketClient()
ws.on('speak', handle_speak)

event_thread = Thread(target=connect)
event_thread.setDaemon(True)
event_thread.start()

class Detector:

	def __init__(self):
		self.lang = config.get('Base', 'lang')

	def detected_callback(self):

		def create_ws_detect():
				def onConnected(event=None):
					ws.emit(Message('onyx_detect'))
					t.close()

				ws = WebsocketClient()
				ws.on('connected', onConnected)
				# This will block until the client gets closed
				ws.run_forever()

		t = threading.Thread(target=create_ws_detect)
		t.start()

		self.detector.terminate()

		play_wav(list(onyx.__path__)[0] + "/client/speech/resources/ding.wav")

		r = sr.Recognizer()

		
		m = sr.Microphone()

		"""
        for i, microphone_name in enumerate(sr.Microphone.list_microphone_names()):
            if microphone_name == "MATRIXIO-SOUND: - (hw:2,0)":
                m = sr.Microphone(device_index=i)
		"""

		try:
			with m as source:
				print("Say something!")
				audio = r.listen(source, timeout=1, phrase_time_limit=5)
				self.detector.terminate()
		except:
			self.detector.terminate()
			time.sleep(5)
			self.detector.start(self.detected_callback)

		try:

			result = stt.execute(audio, language=self.lang)
			print("You said: " + result)

			def create_ws_send():
				def onConnected(event=None):
					print ("Sending message...")
					payload = {
					        'utterance': result,
							'token': token
					}
					ws.emit(Message('onyx_recognizer:utterance', payload))
					ws.emit(Message('onyx_detect_finish'))
					t.close()


				ws = WebsocketClient()
				ws.on('connected', onConnected)
				# This will block until the client gets closed
				ws.run_forever()

			t = threading.Thread(target=create_ws_send)
			t.start()
			self.detector.terminate()

			time.sleep(15)

			self.detector.start(self.detected_callback)


		except sr.UnknownValueError:
			print("Speech Recognition could not understand audio")
			self.detector.terminate()

			time.sleep(5)

			self.detector.start(self.detected_callback)
			
		except sr.RequestError as e:
			print("Could not request results from Speech Recognition service; {0}".format(e))
			self.detector.terminate()
			
			time.sleep(5)

			self.detector.start(self.detected_callback)

	def start(self):
		self.detector = snowboydecoder.HotwordDetector(list(onyx.__path__)[0] + "/client/speech/resources/Onyx.pmdl", sensitivity=0.5, audio_gain=1)
		print('Starting...')
		self.detector.start(self.detected_callback)


if __name__ == "__main__":
	detector = Detector()
	detector.start()
