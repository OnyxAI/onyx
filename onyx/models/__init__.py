from sqlalchemy.ext.declarative import DeclarativeMeta
import json

from .UserModel import User
from .NavModel import Nav
from .ButtonsModel import Buttons
from .RevokedTokenModel import RevokedToken

__all__ = ['User', 'RevokedToken', 'Nav', 'Buttons']

def to_dict(obj):
    if isinstance(obj.__class__, DeclarativeMeta):
        # an SQLAlchemy class
        fields = {}
        for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
            data = obj.__getattribute__(field)
            try:
                json.dumps(data)  # this will fail on non-encodable values, like other classes
                if data is not None:
                    fields[field] = data
            except TypeError:
                pass
        # a json-encodable dict
        return fields
