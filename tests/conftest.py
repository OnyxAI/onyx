import sys
import os
import pytest

from webtest import TestApp
from onyx.app import create_app
from onyx.extensions import db as _db
from onyx.app_config import TestConfig

from onyx.models import User, to_dict

from flask import session
from flask_jwt_extended import create_access_token, create_refresh_token

from passlib.hash import sha256_crypt

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

@pytest.yield_fixture(scope='function')
def app():
    """An application for the tests."""
    _app = create_app(config=TestConfig)
    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()

@pytest.fixture(scope='function')
def testapp(app):
    """A Webtest app."""

    return TestApp(app)

@pytest.yield_fixture(scope='function')
def connected_admin_app(app):
    """A Webtest app with connected admin user."""
    test_app = TestApp(app)

    user = User(username='Admin', color='blue', mode='light', email='admin@starkindustries.com', password=sha256_crypt.hash("123456"), firstname="Admin", lastname="Strator", language="en-US")
    _db.session.add(user)
    _db.session.commit()

    access_token = create_access_token(identity = to_dict(user))
    refresh_token = create_refresh_token(identity = to_dict(user))

    test_app.authorization = ('Bearer', access_token)

    yield test_app

    _db.drop_all()

@pytest.yield_fixture(scope='function')
def connected_app(app):
    """A Webtest app with connected user."""
    test_app = TestApp(app)

    user = User(username='User', color='blue', mode='light', email='user@starkindustries.com', password=sha256_crypt.hash("123456"), firstname="User", lastname="Name", language="en-US")
    _db.session.add(user)
    _db.session.commit()

    access_token = create_access_token(identity = to_dict(user))
    refresh_token = create_refresh_token(identity = to_dict(user))

    test_app.authorization = ('Bearer', access_token)

    yield test_app


@pytest.yield_fixture(scope='function')
def connected_app_refresh(app):
    """A Webtest app with connected user using refresh token."""
    test_app = TestApp(app)

    user = User(username='User_refresh', color='blue', mode='light', email='user_refresh@starkindustries.com', password=sha256_crypt.hash("123456"), firstname="User_refresh", lastname="Name", language="en-US")
    _db.session.add(user)
    _db.session.commit()

    access_token = create_access_token(identity = to_dict(user))
    refresh_token = create_refresh_token(identity = to_dict(user))

    test_app.authorization = ('Bearer', refresh_token)

    yield test_app

    _db.drop_all()


@pytest.yield_fixture(scope='function')
def db(app):
    """A database for the tests."""
    _db.app = app
    with app.app_context():
        _db.create_all()

    yield _db

    _db.drop_all()

@pytest.yield_fixture(scope='function')
def user_test_a(db):
    """A database for the tests."""
    user = User(username='Tony', color='blue', mode='light', email='tony@starkindustries.com', password=sha256_crypt.hash("tony1234"), firstname="Tony", lastname="Stark", language="en-US")
    db.session.add(user)
    db.session.commit()

    yield user

    db.drop_all()

@pytest.yield_fixture(scope='function')
def user_test(db):
    """A database for the tests."""
    user = User(username='Pepper', color='blue', mode='light', email='pepper@starkindustries.com', password=sha256_crypt.hash("pepper1234"), firstname="Pepper", lastname="Pot", language="en-US")
    db.session.add(user)
    db.session.commit()

    yield user

    db.drop_all()
