import json
import os

PACKAGE_ROOT = os.path.dirname(__file__)

def update_metadata(new_metadata):
    print("outputting metadata...")
    filepath = os.path.join(PACKAGE_ROOT, "..", "data_files", "metadata.json")
    metadata = json.loads(open(filepath).read())
    metadata.update(new_metadata)
    json_metadata = json.dumps(metadata, indent=2, sort_keys=True)
    open(filepath, 'w').write(json_metadata)
    print(f"√ updated {filepath}")
