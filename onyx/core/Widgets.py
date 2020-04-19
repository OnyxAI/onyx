from . import api
from onyx.api.widgets import Widgets, WidgetsStore

api.add_resource(Widgets, '/widgets')
api.add_resource(WidgetsStore, '/widgets/store')
