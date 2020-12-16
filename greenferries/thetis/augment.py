# python3 -m greenferries.thetis.augment

import pandas as pd
import numpy as np
import os
import sys
from greenferries.ecoscore import get_ecoscore_letter
import re

NM_TO_KM = 1.852001
PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
INPUT_PATH = os.path.join(PACKAGE_ROOT, "..", "data_files", "thetis_export_all.csv")
OUTPUT_PATH = os.path.join(PACKAGE_ROOT, "..", "data_files", "thetis_all_with_computed.csv")


class Augment():
    def run(self):
        df = pd.read_csv(INPUT_PATH)
        df["annual_computed_distance"] = (
            df["annual_monitoring_total_co2_emissions"] * 1000 /
            df["annual_average_co2_emissions_per_distance"]
        )
        df["annual_computed_distance_km"] = df["annual_computed_distance"] * NM_TO_KM
        df["annual_computed_pax"] = (
            df["annual_monitoring_co2_emissions_assigned_to_passenger_transport"] * 1000 /
            ((df["annual_average_co2_emissions_per_transport_work_pax"] / 1000) * df["annual_computed_distance"])
        )
        df["annual_computed_freight"] = (
            df["annual_monitoring_co2_emissions_assigned_to_freight_transport"] * 1000 /
            ((df["annual_average_co2_emissions_per_transport_work_freight"] / 1000) * df["annual_computed_distance"])
        )
        df["annual_computed_average_speed"] = (
            df["annual_computed_distance_km"] /
            df["annual_monitoring_total_time_spent_at_sea"]
        )
        df["annual_computed_ratio_co2_from_pax"] = (
            df["annual_monitoring_co2_emissions_assigned_to_passenger_transport"] /
            df["annual_monitoring_total_co2_emissions"]
        )
        df["annual_computed_average_co2_emissions_per_transport_work_pax_km"] = (
            df["annual_average_co2_emissions_per_transport_work_pax"] / NM_TO_KM
        )
        df["computed_ecoscore_letter"] = (
            df["annual_computed_average_co2_emissions_per_transport_work_pax_km"].replace({np.nan: None}).apply(lambda x: get_ecoscore_letter(x))
        )
        df["technical_efficiency_eiv"] = df["technical_efficiency"].apply(lambda te: self.eiv_value(te))
        df["technical_efficiency_eedi"] = df["technical_efficiency"].apply(lambda te: self.eedi_value(te))
        df.to_csv(OUTPUT_PATH, index=False)
        print(f"rewrote {OUTPUT_PATH}")

    def eiv_value(self, technical_efficiency):
        if not isinstance(technical_efficiency, str):
            return None
        match_data = re.match(r"EIV \((.*) gCO₂/t·nm\)", technical_efficiency)
        if not match_data:
            return None
        return float(match_data.groups()[0])

    def eedi_value(self, technical_efficiency):
        if not isinstance(technical_efficiency, str):
            return None
        match_data = re.match(r"EEDI \((.*) gCO₂/t·nm\)", technical_efficiency)
        if not match_data:
            return None
        return float(match_data.groups()[0])


if __name__ == "__main__":
    Augment().run()
