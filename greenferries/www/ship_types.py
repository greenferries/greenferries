# python3 -m greenferries.www.ship_types

import json, os
import pandas as pd
from greenferries.www.thetis_df import get_df as get_www_thetis_df
from greenferries.db import get_connection

DIRNAME = os.path.dirname(__file__)
WWW_DATA_SHIP_TYPES_PATH = os.path.join(DIRNAME, "../../www/11ty_input/doc/ship_types.11tydata.json")

def create_files():
    df_www_ships = pd.read_sql("SELECT * FROM ships", get_connection("www"))
    df_thetis_ships = pd.read_sql("""
        SELECT *
        FROM thetis
        WHERE reporting_period = (SELECT MAX(reporting_period) FROM thetis)
    """, get_connection("all_ships"))
    df_thetis_ropax = df_thetis_ships[df_thetis_ships["ship_type"].isin(["Ro-pax ship", "Passenger ship"])]
    data = {
        "thetisShipsCount": df_thetis_ships.shape[0],
        "shipTypesValueCounts": df_thetis_ships["ship_type"].value_counts().to_dict(),
        "thetisPassengerShipsCount": df_thetis_ropax.shape[0],
        "outOfScopeShipsCount": df_www_ships[df_www_ships["out_of_scope"] == 1].shape[0],
        "totalShipsCount": df_www_ships[df_www_ships["out_of_scope"] == 0].shape[0]
    }
    with open(WWW_DATA_SHIP_TYPES_PATH, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"rewrote {WWW_DATA_SHIP_TYPES_PATH}")


if __name__ == "__main__":
    create_files()
