# python3 scripts/compute_inferred_values.py

import pandas as pd
import os
import sys
from ecoscore import get_ecoscore_letter

NM_TO_KM = 1.852001

DIRNAME = os.path.dirname(__file__)
INPUT_PATH = os.path.join(DIRNAME, "../files_computed/thetis_export_all.csv")
OUTPUT_PATH = os.path.join(DIRNAME, "../files_computed/thetis_all_with_computed.csv")

class ComputeInferredValues():
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
            df["annual_computed_average_co2_emissions_per_transport_work_pax_km"].apply(lambda x: get_ecoscore_letter(x))
        )
        df.to_csv(OUTPUT_PATH, index=False)


if __name__ == "__main__":
    ComputeInferredValues().run()
