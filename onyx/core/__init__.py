from flask_restful import Api
from onyx.neurons.core import get_api
from onyx.app_config import Config

api = Api()

# Importing each route
from .User import *
from .Neurons import *

all_neurons = get_api(Config().NEURON_FOLDER)
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
