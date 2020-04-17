from onyx.extensions import db

class Notifications(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    seen = db.Column(db.Boolean(), nullable=False)
    user = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    content = db.Column(db.String())
    icon = db.Column(db.String())
    color = db.Column(db.String())
