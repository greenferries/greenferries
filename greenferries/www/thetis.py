# python3 -m greenferries.www.thetis

import os, re, json
import numpy as np
import pandas as pd
from greenferries.www.thetis_df import get_df as get_www_thetis_df

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
WWW_SHIPS_PATH = os.path.join(PACKAGE_ROOT, "..", "www", "views", "ships")
WWW_THETIS_DATA_PATH = os.path.join(PACKAGE_ROOT, "..", "www", "views", "_data", "thetis")


def camelCase(st):
    output = ''.join(x for x in st.title() if x.isalnum())
    return output[0].lower() + output[1:]


def create_files():
    df = get_www_thetis_df().replace({np.nan: None})
    df.columns = df.columns.map(lambda x: camelCase(x))
    filenames = os.listdir(WWW_SHIPS_PATH)
    matching_filenames = [fn for fn in filenames if re.match(r".*-(\d+)\.md", fn)]
    imos = [re.match(r".*-(\d+)\.md", fn).groups()[0] for fn in matching_filenames]
    for imo in imos:
        data = {}
        for _idx, row in df[df.imo == imo].iterrows():
            row_dict = row.to_dict()
            data[str(int(row_dict['reportingPeriod']))] = row_dict
        path = os.path.join(WWW_THETIS_DATA_PATH, f"thetis-{imo}.json")
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)
    print(f"rewrote {len(imos)} thetis json files in www/11ty_input/_data/thetis")


if __name__ == "__main__":
    create_files()
