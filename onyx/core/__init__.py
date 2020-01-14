from flask_restful import Api
from flask_socketio import SocketIO
from flask_restful.utils import cors

api = Api()
sockyx = SocketIO(logger=True)

# Importing each route
from .User import *

# Importing Sockyx
from .Sockyx import *