# python3 data/scripts/thetis/export_jsons.py

import os
import json
import re
import pandas as pd
import numpy as np

DIRNAME = os.path.dirname(__file__)
WWW_SHIPS_DATA_PATH = os.path.join(DIRNAME, '../../../www/views/ships')
WWW_THETIS_DATA_PATH = os.path.join(DIRNAME, '../../../www/views/_data/thetis')
THETIS_CSV_PATH = os.path.join(DIRNAME, "../../files_computed/thetis_all_with_computed.csv")

def camelCase(st):
    output = ''.join(x for x in st.title() if x.isalnum())
    return output[0].lower() + output[1:]

df_thetis = pd.read_csv(THETIS_CSV_PATH).replace({np.nan: None})
df_thetis.columns = df_thetis.columns.map(lambda x: camelCase(x))

filenames = os.listdir(WWW_SHIPS_DATA_PATH)
matching_filenames = [fn for fn in filenames if re.match(r".*-(\d+)\.md", fn)]
imos = [re.match(r".*-(\d+)\.md", fn).groups()[0] for fn in matching_filenames]

print(f"iterating over {len(imos)} IMOs to write THETIS json files")

for imo in imos:
    data = {}
    for _idx, row in df_thetis[df_thetis.imo == int(imo)].iterrows():
        row_dict = row.to_dict()
        data[str(int(row_dict['reportingPeriod']))] = row_dict
    path = os.path.join(WWW_THETIS_DATA_PATH, f"thetis-{imo}.json")
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

print(f"done!")
