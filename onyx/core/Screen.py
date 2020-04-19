from . import api
from onyx.api.screen import Screen, ScreenStore

api.add_resource(Screen, '/screen')
api.add_resource(ScreenStore, '/screen/store')
