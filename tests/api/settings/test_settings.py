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
from flask import session

@pytest.mark.usefixtures('db', 'connected_app', 'connected_app_refresh', 'connected_admin_app', 'user_test')
class Test_SettingsApi:

    def test_get_onyx_data(self, connected_app):
        response = connected_app.get('/api/settings/get_onyx_data')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"