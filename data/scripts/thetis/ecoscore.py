# python3 scripts/thetis/ecoscore.py files_computed/thetis_all_with_computed.csv

import pandas as pd
import os
import sys
import matplotlib.pyplot as plt
import json

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
WWW_IMG_PATH = os.path.join(DIRNAME, "../../../www/assets/img")
WWW_DATA_PATH = os.path.join(DIRNAME, "../../../www/views/_data")

def get_ecoscore_index(g_co2_per_km_pax):
    for index, threshold in enumerate(THRESHOLDS):
        if g_co2_per_km_pax < threshold:
            return index
    return 3

def get_ecoscore_letter(g_co2_per_km_pax):
    if not g_co2_per_km_pax:
        return None
    return ["A", "B", "C", "D", "E"][get_ecoscore_index(g_co2_per_km_pax)]


class CreateEcoscoreWwwDataFilesAndPlots(object):
    def __init__(self, input_csv_path):
        self.input_csv_path = input_csv_path

    def run(self):
        self.prepare_df()
        self.export_emissions_distribution_graph()
        self.export_ecoscore_distribution_graph()
        self.export_global_data()

    def prepare_df(self):
        df_all = pd.read_csv(self.input_csv_path, dtype={"imo": str})
        df_ferries = df_all[df_all.ship_type.isin(["Ro-pax ship", "Passenger ship"])]
        self.df = df_ferries[df_ferries.reporting_period == 2019]

    def export_emissions_distribution_graph(self):
        co2 = self.df['annual_computed_average_co2_emissions_per_transport_work_pax_km']
        co2.describe()
        co2_cut = co2[co2 < co2.quantile(0.95)]
        plot = co2_cut.plot.hist(bins=20)
        plot.set_xlabel("average g·CO²/km/person")
        plot.set_ylabel(f"Ships count ({len(co2_cut)} represented)")
        plot.figure.savefig(os.path.join(WWW_IMG_PATH, "doc_ships_emissions_distribution.svg"), format="svg")

    def export_ecoscore_distribution_graph(self):
        plt.clf()
        ecoscore_freqs = self.df["computed_ecoscore_letter"].value_counts(sort=False)
        ecoscore_freqs = ecoscore_freqs.reindex(index = ['A','B','C', 'D', 'E'])
        plot = ecoscore_freqs.plot.bar()
        plot.set_xlabel("Ecoscore")
        plot.set_ylabel("Ships count")
        plot.figure.savefig(os.path.join(WWW_IMG_PATH, "doc_ships_ecoscore_distribution.svg"), format="svg")

    def export_global_data(self):
        path = os.path.join(WWW_DATA_PATH, "ecoscoreInfo.json")
        with open(path, "w") as f:
            f.write(json.dumps({"gCo2PerKmPaxThresholds": THRESHOLDS}))
        print(f"wrote {path}")

if __name__ == "__main__":
    ComputeEcoscoreWwwFiles(sys.argv[1]).run()
