from flask import jsonify, make_response, app
from flask_restful import Resource, reqparse
from onyx.decorators import login_required

from onyx.config import Config

import json
import os

class Neurons():

    def createNeuronFile(self, path):
        all_neurons = []

        for root, dirs, files in os.walk(path):
            for name in files:
                if name == "neuron_info.json":
                    full_path = os.path.join(root, name)
                    import_neuron_path = os.path.join(os.path.dirname(full_path), "dist", "index.js")
                    with open(full_path, 'r') as neuron_file:
                        neuron = json.load(neuron_file)
                        neuron["path"] = os.path.dirname(full_path)
                        neuron["import_path"] = import_neuron_path

                        all_neurons.append(neuron)

        with open(Config.BASE_PATH + '/neuron_list.json', 'w') as outfile:
            json.dump(all_neurons, outfile)    

class GetAllNeurons(Resource):
    def get(self):
        try:
            with open(Config.BASE_PATH + '/neuron_list.json', 'r') as data:
                return jsonify(status="success", neurons=json.load(data))   
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))