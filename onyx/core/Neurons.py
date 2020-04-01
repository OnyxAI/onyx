from . import api
from onyx.api.neurons import GetAllNeurons

api.add_resource(GetAllNeurons, '/neurons/get_all')
