#!/bin/sh

heroku config:set $(cat ../.env | sed '/^$/d; /#[[:print:]]*$/d')
