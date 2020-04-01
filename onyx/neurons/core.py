# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
import os, imp
from onyx.app_config import Config
from onyx.config import get_config
from onyx.sockyx.message import Message
from onyx.utils.log import getLogger

logger = getLogger("Neurons")
config = get_config('onyx')

BLACKLISTED_NEURONS = []
NEURONS_DIR = Config().NEURON_FOLDER
MainModule = '__init__'

def load_neuron(neuron_descriptor, sockyx):
    try:
        logger.info("ATTEMPTING TO LOAD NEURON: " + neuron_descriptor["name"])
        if neuron_descriptor['name'] in BLACKLISTED_NEURONS:
            logger.info("NEURON IS BLACKLISTED " + neuron_descriptor["name"])
            return None
        neuron_module = imp.load_module(neuron_descriptor["name"] + MainModule, *neuron_descriptor["info"])
        if (hasattr(neuron_module, 'create_neuron') and callable(neuron_module.create_neuron)):
            neuron = neuron_module.create_neuron()
            neuron.bind(sockyx)
            #neuron.load_data_files(dirname(neuron_descriptor['info'][1]))
            neuron.initialize()
            if (hasattr(neuron, 'at_run') and callable(neuron.at_run)):
                try:
                    neuron.at_run()
                except Exception as e:
                    logger.error('Error at_run for ' + neuron_descriptor["name"] + ' : ' + str(e))
            logger.info("Loaded " + neuron_descriptor["name"])
            return neuron
        else:
            logger.warn("Module {} does not appear to be neuron".format(neuron_descriptor["name"]))
    except:
        logger.error("Failed to load {}".format(neuron_descriptor["name"]))
    return None

def create_neuron_descriptor(neuron_folder):
    info = imp.find_module(MainModule, [neuron_folder])
    return {"name": os.path.basename(neuron_folder), "info": info}

class OnyxNeuron(object):

    def __init__(self, name, sockyx=None):
        self.name = name
        self.bind(sockyx)
        self.config = config
        self.log = getLogger(name)

    @property
    def lang(self):
        return self.config.get('Base', 'lang')

    def bind(self, sockyx):
        if sockyx:
            self.sockyx = sockyx

    def initialize(self):
        raise Exception("Initialize not work for the neuron : " + self.name)

    def speak(self, utterance, lang):
        logger.info("Speak: " + utterance)
        self.sockyx.emit(Message("speak", {'utterance': utterance, 'lang': lang}))

    def shutdown(self):
        self.stop()