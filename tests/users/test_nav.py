# -*- coding: utf-8 -*-
"""
Onyx Project
https://onyxlabs.fr
Software under licence Creative Commons 3.0 France
http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
You may not use this software for commercial purposes.
@author :: Cassim Khouani
"""
import json
import pytest

from onyx.extensions import db
from onyx.models import Nav
from flask import session


@pytest.mark.usefixtures('db', 'connected_app', 'connected_app_refresh', 'connected_admin_app', 'user_test')
class Test_NavApi:

    def test_get_nav(self, connected_app):
        response = connected_app.get('/api/users/nav')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_add_nav(self, connected_app):
        response = connected_app.post('/api/users/nav', {"position": "1", "buttonNumber": "1", "url": "url", "icon": "user", "color": "blue"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json == {"status": "success"}

    def test_remove_nav(self, connected_app):
        nav = Nav(user=1, position="1", buttonNumber="1", url="/", icon="fa-user", color="blue")

        db.session.add(nav)
        db.session.commit()

        response = connected_app.put('/api/users/nav', {"position": "1", "buttonNumber": "1"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json == {"status": "success"}

