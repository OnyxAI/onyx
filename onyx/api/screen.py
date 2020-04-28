import os, json
from flask import jsonify, make_response, app
from flask_jwt_extended import get_jwt_identity
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.utils.log import getLogger
from onyx.extensions import db
from onyx.models import Screen as ScreenModel, to_dict, ScreenLayouts as ScreenLayoutsModel
from onyx.config import Config

log = getLogger('Screen')

class ScreenStore(Resource):
    @login_required
    def get(self):
        try:
            all_screen = []

            for root, dirs, files in os.walk(Config.NEURON_PATH):
                for name in files:
                    if name == "neuron_info.json":
                        full_path = os.path.join(root, name)
                        with open(full_path, 'r') as neuron_file:
                            neuron = json.load(neuron_file)
                            if 'screen' in neuron:
                                for screen in neuron['screen']:
                                    screen['type'] = 'neuron'
                                    all_screen.append(screen)

            return jsonify(status="success", screen=all_screen)
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e))

class Screen(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('name')
    parser.add_argument('raw')
    parser.add_argument('type')
    parser.add_argument('id')
    parser.add_argument('beautifulName')
    parser.add_argument('defaultLayout')

    @login_required
    def get(self):
        try:
            user = get_jwt_identity()

            all_screen = [to_dict(screen) for screen in ScreenModel.query.filter_by(user=user['id']).limit(100)]

            layouts_query = ScreenLayoutsModel.query.filter_by(user=user['id']).first()

            if layouts_query is None:
                layouts = "[]"
            else:
                layouts = layouts_query.layouts

            return jsonify(status="success", screen=all_screen, layouts=layouts)
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
            beautifulName = args['beautifulName']
            defaultLayout = args['defaultLayout']

            try:
                if raw != '' and name != '' and type != '':
                    query = ScreenModel(user=user['id'], name=name, raw=raw, type=type, defaultLayout=defaultLayout, beautifulName=beautifulName)

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
                query = ScreenModel.query.filter_by(user=user['id'], id=id).first()

                db.session.delete(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                print(e)
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500

class ScreenLayouts(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('layouts')

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()

            layouts = args['layouts']

            query = ScreenLayoutsModel.query.filter_by(user=user['id']).first()

            if query is None:
                new = ScreenLayoutsModel(user=user['id'], layouts=layouts)

                db.session.add(new)
            else:
                query.layouts = layouts

                db.session.add(query)

            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
