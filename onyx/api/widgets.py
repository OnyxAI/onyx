import os, json
from flask import jsonify, make_response, app
from flask_jwt_extended import get_jwt_identity
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.utils.log import getLogger
from onyx.extensions import db
from onyx.models import Widgets as WidgetModel, to_dict
from onyx.config import Config

log = getLogger('Widgets')

class WidgetsStore(Resource):
    @login_required
    def get(self):
        try:
            all_widgets = []

            for root, dirs, files in os.walk(Config.NEURON_PATH):
                for name in files:
                    if name == "neuron_info.json":
                        full_path = os.path.join(root, name)
                        with open(full_path, 'r') as neuron_file:
                            neuron = json.load(neuron_file)
                            if 'widgets' in neuron:
                                for widget in neuron['widgets']:
                                    widget['type'] = 'neuron'
                                    all_widgets.append(widget)

            return jsonify(status="success", widgets=all_widgets)
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e))

class Widgets(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('name')
    parser.add_argument('raw')
    parser.add_argument('type')
    parser.add_argument('id')

    @login_required
    def get(self):
        try:
            user = get_jwt_identity()

            all_widgets = [to_dict(widget) for widget in WidgetModel.query.filter_by(user=user['id']).limit(100)]

            return jsonify(status="success", widgets=all_widgets)
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e))

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()

            raw = args['raw']
            name = args['name']
            type = args['type']

            try:
                if raw != '' and name != '' and type != '':
                    query = WidgetModel(user=user['id'], name=name, raw=raw, type=type)

                    db.session.add(query)
                    db.session.commit()

                    return jsonify(status="success")
                else:
                    return jsonify(status="error")
            except Exception as e:
                print(e)
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500

    @login_required
    def put(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()
            id = args['id']

            try:
                query = WidgetModel.query.filter_by(user=user['id'], id=id).first()

                db.session.delete(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                print(e)
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
