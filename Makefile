ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
VIRTUALENV_ROOT=$(ROOT_DIR)/venv
PYTHON=python

all: setup

start_api:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py run -d -r -p 5000

start_client:
	yarn start

test:
	. $(VIRTUALENV_ROOT)/bin/activate; py.test tests/ --color=yes; yarn test

debug:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py run -d -r -p 5000

prod:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py run -p 80

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
