# python3 -m greenferries.thetis.augment

import os, re, sqlite3, json
import pandas as pd
import numpy as np
from greenferries.ecoscore import get_ecoscore_letter
from greenferries.db import get_connection

NM_TO_KM = 1.852001

def get_absolute_path(relative_path):
    return os.path.join(os.path.dirname(__file__), "..", "..", relative_path)

def monitoring_methods(row):
    monitoring_methods = []
    for letter in ["a", "b", "c", "d"]:
        if not pd.isna(row[f"monitoring_method_{letter}"]):
            monitoring_methods.append(letter)
    return json.dumps(monitoring_methods)


class Augment():
    def run(self):
        self.db_con = get_connection()
        df = pd.read_sql_query("SELECT * FROM thetis", self.db_con)
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
        df["monitoring_methods_json"] = df.apply(lambda row: monitoring_methods(row), axis=1)
        cols = [
            "imo",
            "reporting_period",
            "annual_computed_distance",
            "annual_computed_distance_km",
            "annual_computed_pax",
            "annual_computed_freight",
            "annual_computed_average_speed",
            "annual_computed_ratio_co2_from_pax",
            "annual_computed_average_co2_emissions_per_transport_work_pax_km",
            "computed_ecoscore_letter",
            "technical_efficiency_eiv",
            "technical_efficiency_eedi",
            "monitoring_methods_json"
        ]
        df = df[cols]
        df.replace([np.inf, -np.inf], np.nan, inplace=True) # divisions by 0 seem to produce infinity values
        df.to_sql("thetis_computed", self.db_con, if_exists="replace", index=False)

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
