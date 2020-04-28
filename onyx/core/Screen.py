from . import api
from onyx.api.screen import Screen, ScreenStore, ScreenLayouts

api.add_resource(Screen, '/screen')
api.add_resource(ScreenStore, '/screen/store')
api.add_resource(ScreenLayouts, '/screen/layouts')
