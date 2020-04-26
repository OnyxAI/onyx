import os
from flask import Flask, Blueprint, jsonify, render_template, send_from_directory, request, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from onyx.brain.core import get_api
from onyx.core import api, neurons_bp
from onyx.extensions import db
from onyx.app_config import DevConfig, Config
from onyx.models import RevokedToken

from onyx.utils.log import getLogger

to_reload = False
log = getLogger('ONYX')

def create_app(config=DevConfig):
    app = Flask(__name__, template_folder='../dist', static_folder='../dist')

    cors = CORS(app, resources={r"*": {"origins": "*"}})
    app.config.from_object(config)

    register_extensions(app)

    with app.app_context():
        db.create_all()

    return app

def register_extensions(app):
    db.init_app(app)
    api.init_app(app)
    jwt = JWTManager(app)
    app.register_blueprint(neurons_bp)

    @app.route('/api/reload_onyx')
    def reload_onyx():
        try:
            import uwsgi
            uwsgi.reload()
        except Exception as e:
            log.info('Reload Onyx is only use in production mode')

        return jsonify(status="success")

    @app.route("/")
    def serve():
        return send_from_directory(app.static_folder, "index.html")

    @app.route("/<path>")
    def static_proxy(path):
        """static folder serve"""
        file_name = path.split("/")[-1]
        dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
        return send_from_directory(dir_name, file_name)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']

        return RevokedToken.is_jti_blacklisted(jti)

    @app.errorhandler(404)
    def not_found(e):
        if request.path.startswith("/api/"):
            return jsonify(status="error", message="{}".format(e)), 404
        return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(405)
    def not_found(e):
        if request.path.startswith("/api/"):
            return jsonify(status="error", message="{}".format(e)), 405
        return send_from_directory(app.static_folder, "index.html")
