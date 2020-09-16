#!/bin/sh

cd `dirname $0` &&
sh font.sh &&
sh starship.sh &&
sh modern_cmd.sh &&
sh fzf.sh &&
sh link.sh
