#!/bin/bash

# Create the destination directory
mkdir -p src/app/\\[locale\\]

# Move all files and directories from src/app to src/app/[locale]
rsync -a --remove-source-files src/app/ src/app/\\[locale\\]/
