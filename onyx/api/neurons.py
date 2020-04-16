import json, os, git, shutil
from flask import jsonify, make_response, app
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.brain.core import get_neuron
from onyx.utils.log import getLogger
from onyx.api.users import Nav

from onyx.config import Config

nav = Nav()
log = getLogger('Neurons')

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
                        #neuron["import_path"] = import_neuron_path

                        all_neurons.append(neuron)

        with open(Config.BASE_PATH + '/neuron_list.json', 'w') as outfile:
            json.dump(all_neurons, outfile)

    def getAllNeurons(self):
        with open(Config.BASE_PATH + '/neuron_list.json', 'r') as data:
            return json.load(data)

class GetAllNeurons(Resource):
    def get(self):
        try:
            neurons = Neurons()
            neurons.createNeuronFile(Config.NEURON_PATH)

            return jsonify(status="success", neurons=neurons.getAllNeurons())
        except Exception as e:
            log.error(e)
            return jsonify(status="error", message="{}".format(e))

class NeuronsStore(Resource):

    @login_required
    def get(self):
        try:
            with open(Config.DATA_PATH + '/neurons/' + Config.LANG + '.json', 'r') as data:
                return jsonify(status="success", neurons=json.load(data))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))

class InstallNeuron(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('url')
    parser.add_argument('name')

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            name = args['name']
            url = args['url']

            if not os.path.exists(Config.NEURON_PATH + '/' + name):
                # Downloading Neuron
                log.info('Downloading Neuron ' + name)
                git.Repo.clone_from(url, Config.NEURON_PATH + '/' + name)

                neuron = get_neuron(Config.NEURON_PATH, name)

                if (hasattr(neuron, 'create_neuron') and callable(neuron.create_neuron)):
                    Module = neuron.create_neuron()
                    if (hasattr(Module, 'get_api') and callable(Module.install)):
                        Module.install()

                return jsonify(status="success")
            else:
                # Update Neuron
                log.info('Updating Neuron + ' + name)
                neuron_folder = git.cmd.Git(Config.NEURON_PATH + '/' + name)
                neuron_folder.pull()

                neuron = get_neuron(Config.NEURON_PATH, name)

                if (hasattr(neuron, 'create_neuron') and callable(neuron.create_neuron)):
                    Module = neuron.create_neuron()
                    if (hasattr(Module, 'get_api') and callable(Module.update)):
                        Module.update()

                return jsonify(status="success")
        except Exception as e:
            log.error(e)
            return jsonify(status="error", message="{}".format(e))

class RemoveNeuron(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('name')

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            neurons = Neurons()

            name = args['name']

            if os.path.exists(Config.NEURON_PATH + '/' + name):
                # Remove Neuron
                log.info('Removing Neuron ' + name)

                neuron = get_neuron(Config.NEURON_PATH, name)

                if (hasattr(neuron, 'create_neuron') and callable(neuron.create_neuron)):
                    Module = neuron.create_neuron()
                    if (hasattr(Module, 'get_api') and callable(Module.remove)):
                        Module.remove()

                # Remove all nav using this neuron
                nav.remove_neuron_nav(name, neurons.getAllNeurons())

                shutil.rmtree( Config.NEURON_PATH + '/' + name)

                return jsonify(status="success")
            else:
                return jsonify(status="error")

        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e))
