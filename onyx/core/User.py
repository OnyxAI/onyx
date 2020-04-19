from . import api
from onyx.api.users import GetAllUser, GetUser, Nav, Color, Login, Register, Manage, LogoutAccess, LogoutRefresh, TokenValid, Refresh, Buttons, Mode

api.add_resource(GetAllUser, '/users')
api.add_resource(GetUser, '/users/get')
api.add_resource(Login, '/users/login')
api.add_resource(Register, '/users/register')
api.add_resource(TokenValid, '/users/token_valid')
api.add_resource(Refresh, '/users/refresh_token')
api.add_resource(LogoutAccess, '/users/logout_access')
api.add_resource(LogoutRefresh, '/users/logout_refresh')
api.add_resource(Color, '/users/color')
api.add_resource(Mode, '/users/mode')
api.add_resource(Manage, '/users/manage')

api.add_resource(Nav, '/users/nav')

api.add_resource(Buttons, '/users/buttons')
