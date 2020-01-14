from flask import jsonify
from flask_jwt_extended import jwt_required, jwt_refresh_token_required, create_access_token, create_refresh_token, get_jwt_identity, get_raw_jwt
from flask_restful import Resource, reqparse
from flask_restful.utils import cors

from onyx.extensions import db
from onyx.models import User, RevokedToken, Nav as NavModel, to_dict
from passlib.hash import sha256_crypt

class GetAll(Resource):
    @jwt_required
    def get(self):
        try:
            return jsonify([to_dict(user) for user in User.query.all()])
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Get(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('id')

    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            return jsonify(user)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()

            _id = args['id']

            return jsonify(to_dict(User.query.filter_by(id=_id).first()))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Login(Resource):
    
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)

    def post(self):
        try:
            args = self.parser.parse_args()
            
            email = args['email']
            password = args['password']
            
            user = User.query.filter_by(email=email).first()
            
            if user:
                
                if sha256_crypt.verify(password, user.password):

                    access_token = create_access_token(identity = to_dict(user))
                    refresh_token = create_refresh_token(identity = to_dict(user))
                    
                    return jsonify(status="success", access_token=access_token, refresh_token=refresh_token)
                else:
                    return jsonify(status="error", message="Password or Email is wrong.")
            else:
                return jsonify(status="error", message="Password or Email is wrong.")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

        

class Register(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True)
    parser.add_argument('email', required=True)
    parser.add_argument('password', required=True)
    parser.add_argument('language', required=True)
    parser.add_argument('firstname', required=True)
    parser.add_argument('lastname', required=True)

    def post(self):
        try:
            args = self.parser.parse_args()

            email = args['email']
            password = sha256_crypt.hash(args['password'])
            username = args['username']
            language = args['language']
            firstname = args['firstname']
            lastname = args['lastname']

            user = User(email=email, username=username, password=password, firstname=firstname, lastname=lastname, language=language)

            db.session.add(user)
            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Color(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('color', required=True)

    @jwt_required
    def post(self):
        try:
            user = get_jwt_identity()

            args = self.parser.parse_args()

            color = args['color']

            query = User.query.filter_by(id=user['id']).first()

            query.color = color

            db.session.add(query)
            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Nav(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('position', required=True)
    parser.add_argument('buttonNumber', required=True)
    parser.add_argument('color')
    parser.add_argument('url')
    parser.add_argument('icon')

    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            nav = []

            for i in range(1, 6):
                for k in range(1, 8):
                    nav.append({
                        'buttonNumber': str(i),
                        'position': str(k), 
                        'url': "",
                        'color': "#c53838",
                        'icon': "fa fa-plus"
                    })

            nav_all = [to_dict(nav) for nav in NavModel.query.filter_by(user=user['id']).limit(50)]

            for i in range(len(nav_all)):
                for k in range(len(nav)):
                    if nav[k]['buttonNumber'] == nav_all[i]['buttonNumber'] and nav[k]['position'] == nav_all[i]['position']:
                        nav[k] = nav_all[i]

            return jsonify(status="success", nav=nav)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()

            position = args['position']
            buttonNumber = args['buttonNumber']
            color = args['color']
            url = args['url']
            icon = args['icon']

            nav = NavModel(user=user['id'], position=position, buttonNumber=buttonNumber, color=color, url=url, icon=icon)

            db.session.add(nav)
            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def put(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()

            position = args['position']
            buttonNumber = args['buttonNumber']

            try:

                query = NavModel.query.filter_by(position=position, buttonNumber=buttonNumber).first()

                db.session.delete(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                print(e)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500
            

class Manage(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username')
    parser.add_argument('email')
    parser.add_argument('password')
    parser.add_argument('verifPassword', required=True)
    parser.add_argument('language')
    parser.add_argument('firstname')
    parser.add_argument('lastname')

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()
            password = args['password']
            verifPassword = args['verifPassword']

            last_user = get_jwt_identity()

            if sha256_crypt.verify(verifPassword, last_user['password']):

                user = User.query.filter_by(id=last_user['id']).first()

                user.email = args['email']
                user.username = args['username']
                user.language = args['language']
                user.firstname = args['firstname']
                user.lastname = args['lastname']

                if password != '':
                    user.password = sha256_crypt.hash(args['password'])

                db.session.add(user)
                db.session.commit()

                access_token = create_access_token(identity = to_dict(user))
                refresh_token = create_refresh_token(identity = to_dict(user))
                    
                return jsonify(status="success", access_token=access_token, refresh_token=refresh_token)
            else:
                return jsonify(status="error", message="Password Mismatch")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class LogoutAccess(Resource):
    @jwt_required
    def get(self):
        try:
            jti = get_raw_jwt()['jti']

            revoked_token = RevokedToken(jti = jti)
            revoked_token.add()

            return jsonify(status="success", message="Access token has been revoked")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class LogoutRefresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        try:
            jti = get_raw_jwt()['jti']

            revoked_token = RevokedToken(jti = jti)
            revoked_token.add()

            return jsonify(status="success", message="Refresh token has been revoked")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class TokenValid(Resource):
    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            return jsonify(status="success", user=user)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class RefreshUser(Resource):
    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            id = user['id']

            new_user = User.query.filter_by(id=id).first()

            return jsonify(status="success", access_token=create_access_token(identity=to_dict(new_user)))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class Refresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        try:
            user = get_jwt_identity()

            return jsonify(status="success", access_token=create_access_token(identity=user))
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500