#!/bin/bash

user=$(whoami)
if [ $user == "root" ]
then
  su admin -c 'pm2 stop /app/config/pm2.json'
else
  pm2 stop /app/config/pm2.json
fi
