from onyx.extensions import db

class Widgets(db.Model):
    __tablename__ = 'widgets'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    raw = db.Column(db.String(), nullable=False)
    type = db.Column(db.String(), nullable=False)
