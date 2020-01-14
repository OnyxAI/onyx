# -*- coding: utf-8 -*-
"""Model unit tests."""
import datetime as dt

import pytest
from flask import url_for

from onyx.models import User
from factories import UserFactory

from passlib.hash import sha256_crypt


@pytest.mark.usefixtures('db','testapp')
class TestUser:
    """User tests."""

    def test_get_by_id(self, db):
        """Get user by ID."""
        user = User(username='foo', email='foo@bar.com', password=sha256_crypt.hash("pepper1234"), firstname="Pepper", lastname="Pot", language="en-US")
        db.session.add(user)
        db.session.commit()

        retrieved = User.query.filter_by(id=user.id).first()
        assert retrieved == user

    def test_factory(self, db):
        """Test user factory."""
        user = UserFactory(username='foo', email='foo@bar.com', password=sha256_crypt.hash("pepper1234"), firstname="Pepper", lastname="Pot", language="en-US")
        db.session.commit()
        assert bool(user.username)
        assert bool(user.email)
