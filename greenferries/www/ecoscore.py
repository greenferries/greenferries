# python3 -m greenferries.www.ecoscore

import pandas as pd
import numpy as np
import os
import sys
import matplotlib.pyplot as plt
import json
import re
import frontmatter
from greenferries.ecoscore import THRESHOLDS
from greenferries.www.thetis_df import get_df as get_www_thetis_df

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
WWW_IMG_PATH = os.path.join(PACKAGE_ROOT, "../www/assets/img")
WWW_DATA_PATH = os.path.join(PACKAGE_ROOT, "../www/11ty_input/_data")
WWW_SHIPS_DATA_PATH = os.path.join(PACKAGE_ROOT, "../www/11ty_input/ships")


class CreateFiles(object):
    def run(self):
        self.df = get_www_thetis_df(only_last_year = True, only_in_scope=True)
        self.export_emissions_distribution_graph()
        self.export_ecoscore_distribution_graph()
        self.export_global_data()

    def export_emissions_distribution_graph(self):
        plt.clf()
        co2 = self.df['annual_computed_average_co2_emissions_per_transport_work_pax_km']
        co2.describe()
        co2_cut = co2[co2 < co2.quantile(0.95)]
        plot = co2_cut.plot.hist(bins=20)
        plot.set_xlabel("average g·CO²/km/person")
        plot.set_ylabel(f"Ships count ({len(co2_cut)} represented)")
        path = os.path.join(WWW_IMG_PATH, "doc_ships_emissions_distribution.svg")
        plot.figure.savefig(path, format="svg")
        print(f"rewrote {path}")

    def export_ecoscore_distribution_graph(self):
        plt.clf()
        ecoscore_freqs = self.df["computed_ecoscore_letter"].value_counts(sort=False)
        ecoscore_freqs = ecoscore_freqs.reindex(index = ['A','B','C', 'D', 'E'])
        plot = ecoscore_freqs.plot.bar()
        plot.set_xlabel("Ecoscore")
        plot.set_ylabel(f"Ships count (total: {self.df.shape[0]})")
        path = os.path.join(WWW_IMG_PATH, "doc_ships_ecoscore_distribution.svg")
        plot.figure.savefig(path, format="svg")
        print(f"rewrote {path}")

    def export_global_data(self):
        path = os.path.join(WWW_DATA_PATH, "ecoscoreInfo.json")
        with open(path, "w") as f:
            f.write(json.dumps({"gCo2PerKmPaxThresholds": THRESHOLDS}))
        print(f"rewrote {path}")


def create_files():
    CreateFiles().run()


if __name__ == "__main__":
    create_files()
