# python3 -m greenferries.www.ship_types

import os
import json
import re
import pandas as pd
import numpy as np
import frontmatter
from www import get_frontmatter_df

DIRNAME = os.path.dirname(__file__)
THETIS_CSV_PATH = os.path.join(DIRNAME, "../../data_files/thetis_all_with_computed.csv")
WIKIDATA_SHIPS_CSV_PATH = os.path.join(DIRNAME, "../../data_files/original.wikidata.ships.csv")
WIKIDATA_URLS_CSV_PATH = os.path.join(DIRNAME, "../../data_files/original.wikidata.urls.csv")
WWW_DATA_SHIP_TYPES_PATH = os.path.join(DIRNAME, "../../www/views/doc/ship_types.11tydata.json")

class CreateFiles(object):
    def run(self):
        self.prepare_df_thetis()
        self.prepare_df_thetis_filtered()
        self.prepare_df_wikidata()
        self.prepare_df_merged()
        data = {
            "thetisShipsCount": self.df_thetis.shape[0],
            "shipTypesValueCounts": self.df_thetis["ship_type"].value_counts().to_dict(),
            "thetisPassengerShipsCount": self.df_thetis_filtered.shape[0],
            "wikidataShipsCount": self.df_wikidata.shape[0],
            "mergedShipsCount": self.df_merged.shape[0],
            "outOfScopeShipsCount": get_frontmatter_df(only_out_of_scope=True).shape[0],
            "totalShipsCount": get_frontmatter_df(only_in_scope=True).shape[0]
        }
        with open(WWW_DATA_SHIP_TYPES_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"rewrote {WWW_DATA_SHIP_TYPES_PATH}")

    def prepare_df_thetis(self):
        self.df_thetis = pd.read_csv(THETIS_CSV_PATH, usecols=["imo", 'name', "ship_type"], dtype={"imo": str}).replace({np.nan: None}).groupby('imo').agg('first')

    def prepare_df_thetis_filtered(self):
        self.df_thetis_filtered = self.df_thetis[self.df_thetis.ship_type.isin(["Ro-pax ship", "Passenger ship"])]

    def prepare_df_wikidata(self):
        df_wikidata_ships = pd.read_csv(WIKIDATA_SHIPS_CSV_PATH, dtype={"imo": str})
        df_wikidata_urls = pd.read_csv(WIKIDATA_URLS_CSV_PATH, dtype={"imo": str})
        self.df_wikidata = pd.merge(df_wikidata_ships, df_wikidata_urls, on="imo").groupby('imo').agg(set)

    def prepare_df_merged(self):
        self.df_merged = pd.merge(self.df_thetis_filtered, self.df_wikidata, on="imo")


def create_files():
    CreateFiles().run()


if __name__ == "__main__":
    create_files()
