#!/bin/sh

echo "Starting app..."
npm run production:server &
npm run production:preview

wait