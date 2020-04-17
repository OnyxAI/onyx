from . import api
from onyx.api.notifications import Notifications, NotificationsSeen, NotificationsAdd

api.add_resource(Notifications, '/notifications')
api.add_resource(NotificationsSeen, '/notifications/seen')
api.add_resource(NotificationsAdd, '/notifications/add')
