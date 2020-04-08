from onyx.config import Config
from padatious.intent_container import IntentContainer

brain = IntentContainer(Config().ONYX_PATH + '/db/intent_cache')