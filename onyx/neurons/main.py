# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
import os, sys, time, json
from os.path import join
from threading import Timer
from onyx.sockyx.client.ws import WebsocketClient
from onyx.sockyx.message import Message
from onyx.neurons.core import NEURONS_DIR, MainModule, load_neuron, create_neuron_descriptor
from onyx.utils.log import getLogger
from onyx.utils import connected
from onyx.neurons.brain import brain

logger = getLogger('Neuron')

ws = None
loaded_neurons = {}
neuron_reload_thread = None

def _load_neurons():
    global ws, loaded_neurons, neuron_reload_thread
    check_connection()

    # Creating a thread to launch and monitors all neurons
    neuron_reload_thread = Timer(0, _watch_neurons)
    neuron_reload_thread.daemon = True
    neuron_reload_thread.start()


def check_connection():
    if connected():
        ws.emit(Message('onyx.internet.connected'))
    else:
        thread = Timer(1, check_connection)
        thread.daemon = True
        thread.start()

def _get_last_modified_date(path):
    last_date = 0
    # getting all recursive paths
    for root, _, _ in os.walk(path):
        f = root.replace(path, "")
        # checking if is a hidden path
        if not f.startswith(".") and not f.startswith("/."):
            last_date = max(last_date, os.path.getmtime(path + f))
    return last_date


def _watch_neurons():
    global ws, loaded_neurons, last_modified_neuron, id_counter

    # Scan the directory, and laod each neuron, if a neuron is changed reload it
    while True:
        if os.path.exists(NEURONS_DIR):
            # checking neurons dir and getting all neurons there
            list = filter(lambda x: os.path.isdir(os.path.join(NEURONS_DIR, x)), os.listdir(NEURONS_DIR))
            
            for neuron_folder in list:

                if neuron_folder not in loaded_neurons:
                    loaded_neurons[neuron_folder] = {}
                neuron = loaded_neurons.get(neuron_folder)
                neuron["path"] = os.path.join(NEURONS_DIR, neuron_folder)
                # checking if is a neuron
                if not MainModule + ".py" in os.listdir(neuron["path"]):
                    continue
                # getting the newest modified date of neuron
                neuron["last_modified"] = _get_last_modified_date(neuron["path"])
                modified = neuron.get("last_modified", 0)
                # checking if neuron is loaded and wasn't modified
                if neuron.get("loaded") and modified <= last_modified_neuron:
                    continue
                # checking if neuron was modified
                elif neuron.get("instance") and modified > last_modified_neuron:
                    # checking if neuron should be reloaded
                    logger.debug("Reloading Neuron: " + neuron_folder)
                    # removing listeners and stopping threads
                    neuron["instance"].shutdown()
                    del neuron["instance"]
                neuron["loaded"] = True
                neuron["instance"] = load_neuron(create_neuron_descriptor(neuron["path"]), ws)
        # get the last modified neuron
        modified_dates = []
        for i in loaded_neurons.values():
            if i.get("last_modified"):
                modified_dates.append(i.get("last_modified"))

        if len(modified_dates) > 0:
            last_modified_neuron = max(modified_dates)

        # Pause briefly before beginning next scan
        time.sleep(2)

def _talk(event):
    message = event.data['utterance']
    token = event.data['token']

    # Training brain
    brain.train()

    # Asking Brain for an answer
    answer = brain.calc_intent(message)

    response = {
        'name': answer.name,
        'sent': answer.sent,
        'matches': answer.matches,
        'conf': answer.conf,
        'token': token
    }

    ws.emit(Message('neuron:' + answer.name, response))

def main():
    global ws

    ws = WebsocketClient()

    def _log(message):
        # If a message appear, log it
        logger.debug(message)

    ws.on('message', _log)

    ws.on('open', _load_neurons)
    ws.on('onyx_recognizer:utterance', _talk)
    ws.run_forever()



if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(e)
    except KeyboardInterrupt:
        for neuron in loaded_neurons:
            neuron.shutdown()
        if neuron_reload_thread:
            neuron_reload_thread.cancel()
    finally:
        sys.exit()
