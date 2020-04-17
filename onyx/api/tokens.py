import os, git
from flask import jsonify, make_response, app
from flask_jwt_extended import get_jwt_identity, create_access_token, get_jti
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.utils.log import getLogger
from onyx.extensions import db
from onyx.models import Tokens as TokenModel, to_dict, RevokedToken
from onyx.config import Config

log = getLogger('Tokens')

class Tokens(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('name')
    parser.add_argument('id')

    @login_required
    def get(self):
        try:
            tokens = [to_dict(token) for token in TokenModel.query.all()]

            return jsonify(status="success", tokens=tokens)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            system = {
                "id": 0,
                "name": "onyx"
            }

            name = args['name']
            token = create_access_token(identity = to_dict(system), expires_delta=False)

            try:
                query = TokenModel(name=name, token=token)

                db.session.add(query)
                db.session.commit()

                return jsonify(status="success")
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

            id = args['id']

            try:
                query = TokenModel.query.filter_by(id=id).first()

                jti = get_jti(query.token)

                revoked_token = RevokedToken(jti = jti)
                revoked_token.add()

                db.session.delete(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                print(e)
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
