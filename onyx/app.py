from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from onyx.core import api, sockyx
from onyx.extensions import db
from onyx.config import DevConfig
from onyx.models import RevokedToken

def create_app(config=DevConfig):
    app = Flask(__name__, template_folder='../dist')

    cors = CORS(app, resources={r"*": {"origins": "*"}})
    app.config.from_object(config)

    register_extensions(app)

    with app.app_context():
        db.create_all()
    
    return app

def register_extensions(app):
    api.init_app(app)
    sockyx.init_app(app, cors_allowed_origins="*")
    db.init_app(app)
    jwt = JWTManager(app)

    @app.route('/<path:path>')
    def send_static(path):
        return send_from_directory('../dist', path)

    @app.route('/', methods=['GET'])
    def index():
        return render_template('index.html')

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']

        return RevokedToken.is_jti_blacklisted(jti)

    @app.errorhandler(404) 
    def not_found(e): 
        return jsonify(status="error", message="{}".format(e)), 404