import os, git
from flask import jsonify, make_response, app
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.utils.log import getLogger
from onyx.config import Config

log = getLogger('Settings')

class OnyxData(Resource):
    def get(self):
        try:
            if not os.listdir(Config.DATA_PATH) :
                # Download Data
                log.info('Downloading Onyx Data')
                git.Repo.clone_from('https://github.com/OnyxAI/onyx-data', Config.DATA_PATH)
            else:
                # Update Data
                log.info('Updating Onyx Data')
                data_folder = git.cmd.Git(Config.DATA_PATH)
                data_folder.pull()


            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))
