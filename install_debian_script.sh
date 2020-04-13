#!/bin/bash

TOP=$(cd $(dirname $0) && pwd -L)

if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

echo "Onyx Install"
echo "Dependencies Install"
echo "***"
apt-get -y update
apt-get -y install unzip curl git build-essential cmake python3 screen python3-babel python3-software-properties python3-pip python3-setuptools python3-dev python3-virtualenv openssl libssl-dev memcached python3-memcache libmemcached-dev zlib1g-dev libffi-dev swig3.0 swig sox python3-pyaudio libatlas-base-dev libportaudio2 libportaudiocpp0 portaudio19-dev flac mplayer mpg321


echo "Fann Install"
echo "***"
wget http://downloads.sourceforge.net/project/fann/fann/2.2.0/FANN-2.2.0-Source.zip
unzip FANN-2.2.0-Source.zip && cd FANN-2.2.0-Source/ && cmake . && make install &&
rm -rf ${TOP}/FANN-2.2.0-Source
rm -f ${TOP}/FANN-2.2.0-Source.zip

pip3 install virtualenv

apt-get -y install nodejs npm
npm install -g pm2

curl -k -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt update && apt install -y yarn
