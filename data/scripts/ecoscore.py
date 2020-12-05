# python3 scripts/thetis/ecoscore.py

import pandas as pd
import os
import sys
import matplotlib.pyplot as plt
import json
import re
import frontmatter
from www import get_frontmatter_df

NM_TO_KM = 1.852001
CAR_CO2_PER_KM = 193
PLANE_CO2_PER_KM_PAX = 144.6
# cf https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles
THRESHOLDS = [
  round(CAR_CO2_PER_KM / 2),
  round(CAR_CO2_PER_KM),
  round(PLANE_CO2_PER_KM_PAX * 2),
  round(PLANE_CO2_PER_KM_PAX * 4)
]
DIRNAME = os.path.dirname(__file__)
THETIS_CSV_PATH = os.path.join(DIRNAME, "../files_computed/thetis_all_with_computed.csv")
WWW_IMG_PATH = os.path.join(DIRNAME, "../../www/assets/img")
WWW_DATA_PATH = os.path.join(DIRNAME, "../../www/views/_data")
WWW_SHIPS_DATA_PATH = os.path.join(DIRNAME, "../../www/views/ships")

def get_ecoscore_index(g_co2_per_km_pax):
    for index, threshold in enumerate(THRESHOLDS):
        if g_co2_per_km_pax < threshold:
            return index
    return 4

def get_ecoscore_letter(g_co2_per_km_pax):
    if not g_co2_per_km_pax:
        return None
    return ["A", "B", "C", "D", "E"][get_ecoscore_index(g_co2_per_km_pax)]

class CreateEcoscoreWwwDataFilesAndPlots(object):
    def run(self):
        self.prepare_df()
        self.export_emissions_distribution_graph()
        self.export_ecoscore_distribution_graph()
        self.export_global_data()

    def prepare_df(self):
        df = pd.read_csv(THETIS_CSV_PATH, dtype={"imo": str})
        df = df[df.reporting_period == 2019]
        imos_list = [str(s) for s in get_frontmatter_df(exclude_out_of_scope=True).imo]
        df = df[df.imo.isin(imos_list)]
        self.df = df

    def export_emissions_distribution_graph(self):
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

if __name__ == "__main__":
    CreateEcoscoreWwwDataFilesAndPlots().run()
