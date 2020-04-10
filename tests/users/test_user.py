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

from flask import session


@pytest.mark.usefixtures('db', 'connected_app', 'connected_app_refresh', 'connected_admin_app', 'user_test')
class Test_UserApi:

    def test_get_users(self, connected_app):
        response = connected_app.get('/api/users')

        assert response.status_code == 200
        assert response.content_type == 'application/json'

    def test_get_user(self, connected_app):
        response = connected_app.get('/api/users/get')

        assert response.status_code == 200
        assert response.content_type == 'application/json'

    def test_get_user_by_id(self, connected_app):
        response = connected_app.post('/api/users/get', {"id": 1})

        assert response.status_code == 200
        assert response.content_type == 'application/json'

    def test_add_user(self, connected_app):
        response = connected_app.post('/api/users/register', {"email": "test@test.fr", "username": "Test", "password": "123456", "firstname": "John", "lastname": "Doe", "language": "en-US"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json == {"status": "success"}

    def test_login_user(self, connected_app, user_test):
        response = connected_app.post('/api/users/login', {"email": "pepper@starkindustries.com", "password": "pepper1234"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_manage_user(self, connected_app):
        response = connected_app.post('/api/users/manage', {"email": "test@test.fr", "username": "Test", "password": "123456", "verifPassword": "123456", "firstname": "John", "lastname": "Doe", "language": "en-US"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_manage_user_mismatch_password(self, connected_app):
        response = connected_app.post('/api/users/manage', {"email": "test@test.fr", "username": "Test", "password": "123456", "verifPassword": "1234567", "firstname": "John", "lastname": "Doe", "language": "en-US"})

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "error"

    def test_logout_access(self, connected_app, user_test):
        response = connected_app.get('/api/users/logout_access')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_logout_refresh(self, connected_app_refresh, user_test):
        response = connected_app_refresh.get('/api/users/logout_refresh')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_refresh(self, connected_app_refresh, user_test):
        response = connected_app_refresh.get('/api/users/refresh_token')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"

    def test_token_valid(self, connected_app, user_test):
        response = connected_app.get('/api/users/token_valid')

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        assert response.json["status"] == "success"
