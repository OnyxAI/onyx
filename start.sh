#!/usr/bin/env bash

TOP=$(cd $(dirname $0) && pwd -L)
VIRTUALENV_ROOT=${VIRTUALENV_ROOT:-"${TOP}/venv"}

case $1 in
	"web") SCRIPT="make prod_api" ;;
	"service") SCRIPT=${TOP}/onyx/sockyx/service/main.py ;;
  "sockyx") SCRIPT=${TOP}/onyx/sockyx/client/ws.py ;;
	"neurons") SCRIPT=${TOP}/onyx/brain/main.py ;;
	"voice") SCRIPT=${TOP}/onyx/client/speech/main.py ;;
	"cli") SCRIPT=${TOP}/onyx/client/cli/main.py ;;
	*) echo "Usage: start.sh [service | cli | web | voice | neurons ]"; exit ;;
esac

echo "Starting $1"

if [ "$1" = "web" ]
then
    ${SCRIPT} $@
else
		shift

		source ${VIRTUALENV_ROOT}/bin/activate
		PYTHONPATH=${TOP} ${VIRTUALENV_ROOT}/bin/python ${SCRIPT} $@
fi
