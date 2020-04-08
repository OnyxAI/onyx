from . import api
from onyx.api.settings import OnyxData

api.add_resource(OnyxData, '/settings/get_onyx_data')
