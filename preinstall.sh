#!/bin/sh

echo "Checking for FFMPEG"
ffmpeg -version > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "FFMPEG installed"
else
    print "Checking for Homebrew"
    which brew > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "Brew installed"
    else
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi
    brew update && brew install ffmpeg
fi
