#!/usr/bin/env bash

set -Ee

TOP=$(cd $(dirname $0) && pwd -L)

VIRTUALENV_ROOT="${TOP}/venv"

if [ ! -d ${VIRTUALENV_ROOT} ]; then
   mkdir -p $(dirname ${VIRTUALENV_ROOT})
   python3 -m virtualenv -p python3 ${VIRTUALENV_ROOT}
fi
source ${VIRTUALENV_ROOT}/bin/activate
cd ${TOP}

pip install --upgrade pip
pip install --upgrade virtualenv
pip install --no-cache-dir -r requirements.txt

mkdir -p ${TOP}/neurons
mkdir -p ${TOP}/data

yarn install --network-timeout 1000000
yarn build

echo "Setup Finished"
