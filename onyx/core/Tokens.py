from . import api
from onyx.api.tokens import Tokens

api.add_resource(Tokens, '/tokens')
