#!/bin/sh
cd /home/bnuser1/project/bbq-api
#yarn run start
pm2 start yarn --name 'bbq-api' --interpreter bash -- start
