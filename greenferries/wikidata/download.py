# ex python3 -m greenferries.wikidata.download ships

import requests
import re
import os
import json
import sys
import datetime
from .download_ships import DownloadShips
from .download_urls import DownloadUrls
from greenferries.metadata import update_metadata

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")


class Download(object):
    def __init__(self, data_source):
        if data_source not in ["ships", "urls"]:
            raise "unsupported data_source (should be ships or urls)"
        self.data_source = data_source
        self.metadata = {}

    def run(self):
        filekey = f"wikidata.{self.data_source}"
        filename = f"original.{filekey}.csv"
        filepath = os.path.join(PACKAGE_ROOT, "files_original", filename)
        print(f"refreshing original {filekey} file...")
        if self.data_source == "ships":
            DownloadShips(filepath).run()
        elif self.data_source == "urls":
            DownloadUrls(filepath).run()
        self.metadata[filekey] = {
            "date": datetime.datetime.now().strftime("%Y-%m-%d"),
            "filename": filename
        }
        update_metadata(self.metadata)

if __name__ == "__main__":
    Download(sys.argv[1]).run()
