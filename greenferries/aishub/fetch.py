# python3 -m greenferries.aishub.fetch /tmp/aishub.json

from greenferries.www.thetis_df import get_df as get_thetis_df
import requests, json, sys, os
from dotenv import load_dotenv
load_dotenv()

def fetch(filepath):
    ships_imos = get_thetis_df(only_in_scope=True).imo.drop_duplicates().apply(lambda x: str(x)).to_list()

    res = requests.post(
        "https://data.aishub.net/ws.php",
        params={
            "username": os.getenv("AISHUB_USERNAME"),
            "format": "1",
            "output": "json",
            "compress": "0",
            "imo": ",".join(ships_imos),
        }
    )
    # check status code
    if res.status_code != 200:
        print(f"error while fetching file, status code is {res.status_code}")
        sys.exit(1)
    # check response type is json
    if res.headers["Content-Type"] != "application/json":
        print(f"error while fetching file, response type is not json but {res.headers['Content-Type']}. Make sure you set AISHUB_USERNAME in your .env file.")
        sys.exit(1)

    parsed = res.json()

    metadata = parsed[0]
    if metadata["ERROR"]:
        print(f"error while fetching file, response contains an error : {metadata['ERROR']}")
        sys.exit(1)

    if metadata["FORMAT"] != "HUMAN":
        print(f"cannot process file, response format is not HUMAN but : {metadata['FORMAT']}")
        sys.exit(1)

    with open(filepath, "w") as f:
        f.write(json.dumps(parsed, indent=2))

    print(f"succesfully saved {metadata['RECORDS']} trackpoints to {filepath}")


if __name__ == "__main__":
    fetch(sys.argv[1])
