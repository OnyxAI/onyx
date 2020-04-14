from flask_restful import Api
from flask import Blueprint, send_from_directory
from onyx.brain.core import get_api
from onyx.config import Config
import os

api = Api()
neurons_bp = Blueprint('neurons', __name__, static_folder='../../neurons')

# Importing each route
from .User import *
from .Settings import *
from .Neurons import *

all_neurons = get_api(Config.NEURON_PATH)
API_ROUTES = []

for neuron in all_neurons:
    if (hasattr(neuron, 'create_neuron') and callable(neuron.create_neuron)):
        Module = neuron.create_neuron()
        if (hasattr(Module, 'get_api') and callable(Module.get_api)):
            all_routes = Module.get_api()
            for route in all_routes:
                API_ROUTES.append(route)


for route in API_ROUTES:
    api.add_resource(route['class'], route['route'])

@neurons_bp.route('/<neuron>/<path>')
def serve_neuron(neuron, path):
    file_name = path.split("/")[-1]
    dir_name = os.path.join(neurons_bp.static_folder + '/' + neuron + '/dist', "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)