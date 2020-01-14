from onyx.extensions import db

class Nav(db.Model):
    __tablename__ = 'nav'
    
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(), nullable=False)
    position = db.Column(db.String(), nullable=False)
    buttonNumber = db.Column(db.String(), nullable=False)
    url = db.Column(db.String(), nullable=False)
    icon = db.Column(db.String(), nullable=False)
    color = db.Column(db.String(), nullable=False)
