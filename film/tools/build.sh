#!/bin/zsh
# Sound, frames and MP4 for one film, start to finish (after film.html looks right on the contact sheet).
# Run from the repo root: film/tools/build.sh <name> <scratch folder for frames>
set -e
n=$1; scratch=$2; export FILM_DIR=film/$n
node film/tools/make-music.mjs
python3 film/tools/mix.py
node film/tools/render.mjs "$scratch/frames-$n"
mkdir -p film/out
swift film/tools/encode.swift "$scratch/frames-$n" 60 film/$n/audio/soundtrack.wav film/out/$n.mp4 1.6 2>&1 | tail -1
rm -rf "$scratch/frames-$n"
