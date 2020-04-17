import os, git
from flask import jsonify, make_response, app
from flask_jwt_extended import get_jwt_identity
from flask_restful import Resource, reqparse
from onyx.decorators import login_required
from onyx.utils.log import getLogger
from onyx.extensions import db
from onyx.models import Notifications as NotifModel, to_dict
from onyx.config import Config

log = getLogger('Notifications')

class Notifications(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('id')

    @login_required
    def get(self):
        try:
            user = get_jwt_identity()
            notifications = [to_dict(notification) for notification in NotifModel.query.filter_by(user=user['id']).limit(50)]

            return jsonify(status="success", notifications=notifications)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))

    @login_required
    def post(self):
        try:
            args = self.parser.parse_args()

            user = get_jwt_identity()

            id = args['id']

            try:
                query = NotifModel.query.filter_by(user=user['id'], id=id).first()

                db.session.delete(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                print(e)
                return jsonify(status="error")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500

class NotificationsAdd(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('user')
    parser.add_argument('title')
    parser.add_argument('content')
    parser.add_argument('icon')
    parser.add_argument('color')

    def post(self):
        try:
            args = self.parser.parse_args()

            user = args['user']
            title = args['title']
            content = args['content']
            icon = args['icon']
            color = args['color']


            try:

                query = NotifModel(user=user, seen=False, title=title, content=content, icon=icon, color=color)

                db.session.add(query)
                db.session.commit()

                return jsonify(status="success")
            except Exception as e:
                return jsonify(status="error")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

class NotificationsSeen(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)

    @login_required
    def get(self):
        try:
            user = get_jwt_identity()
            notifications = [notification for notification in NotifModel.query.filter_by(user=user['id']).limit(50)]

            for notif in notifications:
                notif.seen = True

                db.session.add(notif)
            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            return jsonify(status="error", message="{}".format(e))
