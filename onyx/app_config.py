import os

class Config(object):
    LANG = 'fr-FR'
    BASE_PATH = os.getcwd()
    ONYX_PATH = os.path.dirname(os.path.realpath(__file__))
    DATA_PATH = BASE_PATH + '/data'
    NEURON_PATH = BASE_PATH + '/neurons'
    SECRET_KEY = 'change me please'
    SECURITY_PASSWORD_SALT= 'change me please'
    PROPAGATE_EXCEPTIONS = False
    JWT_SECRET_KEY = 'change me please'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    STT = 'google'
    TTS = 'google'

    WS_HOST = '0.0.0.0'
    WS_PORT = 8081
    WS_ROUTE = '/core'
    WS_SSL = False

    WAV = 'aplay #1'
    MP3 = 'mplayer #1'


class ProdConfig(Config):
    """Production configuration."""

    ENV = 'prod'
    DEBUG = False
    ASSETS_DEBUG = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///{}".format(os.path.join(Config.ONYX_PATH, 'db', 'data_prod.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG_TB_ENABLED = False  # Disable Debug toolbar

class DevConfig(Config):
    """Development configuration."""

    ENV = 'dev'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///{}".format(os.path.join(Config.ONYX_PATH, 'db', 'data_dev.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG_TB_ENABLED = True
    ASSETS_DEBUG = True  # Don't bundle/minify static assets
    CACHE_TYPE = 'simple'  # Can be "memcached", "redis", etc.


class TestConfig(Config):
    """Test configuration."""

    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    DATA_PATH = Config.BASE_PATH + '/tests/data'
    BCRYPT_LOG_ROUNDS = 4  # For faster tests; needs at least 4 to avoid "ValueError: Invalid rounds"
    WTF_CSRF_ENABLED = False  # Allows form testing
