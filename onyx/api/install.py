import os, git
from flask import jsonify, app
from flask_restful import Resource, reqparse
from onyx.utils.log import getLogger
from onyx.models import User, to_dict
from onyx.config import Config
from onyx.extensions import db

from passlib.hash import sha256_crypt

log = getLogger('Install')

class Install(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)
    parser.add_argument('language', required=True)
    parser.add_argument('firstname', required=True)
    parser.add_argument('lastname', required=True)

    def get(self):
        try:
            users = [to_dict(user) for user in User.query.all()]

            if len(users) > 0:
                return jsonify(status="success", isInstalled="true")
            return jsonify(status="success", isInstalled="false")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))

    def post(self):
        try:
            args = self.parser.parse_args()

            email = args['email']
            password = sha256_crypt.hash(args['password'])
            username = args['username']
            language = args['language']
            firstname = args['firstname']
            lastname = args['lastname']

            user = User(email=email, username=username, password=password, firstname=firstname, lastname=lastname, language=language, color='blue', account_type=1)

            try:
                db.session.add(user)
                db.session.commit()
            except Exception as e:
                return jsonify(status="error", message="onyx.auth.install_error")

            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="onyx.auth.install_error")
