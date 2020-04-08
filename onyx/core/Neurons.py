from . import api
from onyx.api.neurons import GetAllNeurons, NeuronsStore, InstallNeuron, RemoveNeuron

api.add_resource(GetAllNeurons, '/neurons/get_all')
api.add_resource(NeuronsStore, '/neurons/get_store_list')
api.add_resource(InstallNeuron, '/neurons/install')
api.add_resource(RemoveNeuron, '/neurons/remove')
