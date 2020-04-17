from onyx.extensions import db

class Tokens(db.Model):
    __tablename__ = 'tokens'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    token = db.Column(db.String(), nullable=False, unique=True)
