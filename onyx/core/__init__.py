from flask_restful import Api
from flask_restful.utils import cors

api = Api()

# Importing each route
from .User import *
from .Neurons import *
