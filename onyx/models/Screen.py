from onyx.extensions import db

class Screen(db.Model):
    __tablename__ = 'screen'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    raw = db.Column(db.String(), nullable=False)
    type = db.Column(db.String(), nullable=False)
    beautifulName = db.Column(db.String(), nullable=False)
    defaultLayout = db.Column(db.String())

class ScreenLayouts(db.Model):
    __tablename__ = 'screen_layouts'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(), nullable=False)
    layouts = db.Column(db.String(), nullable=False)
