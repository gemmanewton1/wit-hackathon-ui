#!/bin/bash

for port in 3000 8080; do
  pid=$(lsof -ti :$port)
  if [ -n "$pid" ]; then
    kill -9 $pid
    echo "Killed process on port $port (PID: $pid)"
  else
    echo "No process running on port $port"
  fi
done

echo "Running 'docker compose down'..."
docker compose stop