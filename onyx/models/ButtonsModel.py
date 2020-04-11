from onyx.extensions import db

class Buttons(db.Model):
    __tablename__ = 'buttons'
    
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(), nullable=False)
    buttonNumber = db.Column(db.String(), nullable=False)
    icon = db.Column(db.String(), nullable=False)
