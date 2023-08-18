# python3 -m greenferries.aishub.fetch_and_store /tmp/aishub.json

import sys
from greenferries.aishub.fetch import fetch
from greenferries.aishub.store import store

def fetch_and_store(json_filepath="/tmp/aishub.json"):
    fetch(json_filepath)
    store(json_filepath)

if __name__ == "__main__":
  fetch_and_store(sys.argv[1])
