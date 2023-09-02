# python3 -m greenferries.aishub.fetch_and_store /tmp/aishub.json

import sys, tempfile, os
from greenferries.aishub.fetch import fetch
from greenferries.aishub.store import store

def fetch_and_store(json_filepath=None):
    if json_filepath is None:
        json_filepath = os.path.join(tempfile.gettempdir(), "aishub.json")
    fetch(json_filepath)
    store(json_filepath)

if __name__ == "__main__":
    json_filepath = sys.argv[1] if len(sys.argv) > 1 else None
    fetch_and_store(json_filepath)
