#!/usr/bin/env bash
set +ex
ipfs key gen $RANDOM > /dev/null 2>&1

platform='unknown'
unamestr=$(uname)
if [[ "$unamestr" == 'Linux' ]]; then
   platform='linux'
   B64_KEY=$(base64 -w 0 $(ls -dt1 ~/.ipfs/keystore/* | head -n 1))
else # [[ "$unamestr" == 'Darwin' ]]; then
   platform='macos'
   B64_KEY=$(base64 $(ls -dt1 ~/.ipfs/keystore/* | head -n 1))
fi

node keytool.js $B64_KEY 1 > /dev/null 2>&1

if [[ $? != 0 ]]; then
    echo "Tests passed!"
    exit 0
else
    echo "Tests failed!"
    exit 1
fi
