ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
VIRTUALENV_ROOT=$(ROOT_DIR)/venv
PYTHON=python

all: setup

dev_api:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py run -d -r -p 5000

prod_api:
	. $(VIRTUALENV_ROOT)/bin/activate; uwsgi --socket 0.0.0.0:5000 --protocol=http --wsgi-file uwsgi.py --py-autoreload 1

start_client:
	yarn start

build_client:
	yarn build

test:
	. $(VIRTUALENV_ROOT)/bin/activate; py.test tests/ --color=yes; yarn test

setup:
	bash setup.sh

init:
	export PYTHONPATH=$PYTHONPATH:ROOT_DIR

db_init:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py db init

db_migrate:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py db migrate

db_upgrade:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py db upgrade
