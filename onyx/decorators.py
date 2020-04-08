from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTDecodeError, WrongTokenError
from jwt.exceptions import ExpiredSignatureError
from functools import wraps

def login_required(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except (ValueError, JWTDecodeError, TypeError, WrongTokenError, IndexError):
            return {'status': 'error','message': 'onyx.global.error'}, 401
        except ExpiredSignatureError:
            return {'status': 'error','message': 'onyx.global.error'}, 401
        return func(*args, **kwargs)
    return decorator

def jwt_refresh_token_needed(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        try:
            verify_jwt_refresh_token_in_request()
        except (ValueError, JWTDecodeError, TypeError, WrongTokenError, IndexError):
            return {'error': 'refresh token error'}, 401

        return func(*args, **kwargs)
    return decorator