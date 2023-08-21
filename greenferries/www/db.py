# python3 -m greenferries.www.db

import pandas as pd
from greenferries.db import get_connection
from greenferries.www.thetis_df import get_df as get_www_thetis_df
from greenferries.www.frontmatter_df import get_df as get_frontmatter_df


class CreateDB(object):
    def run(self):
        imos = get_frontmatter_df(only_in_scope=True).imo.to_list()
        db_con_all_ships = get_connection(db_name="all_ships")
        db_www_con = get_connection(db_name="www")

        df = pd.read_sql_query(
            """
                SELECT
                    thetis.imo,
                    thetis.reporting_period,
                    computed_ecoscore_letter,
                    annual_monitoring_co2_emissions_assigned_to_passenger_transport,
                    annual_average_co2_emissions_per_transport_work_pax,
                    annual_monitoring_co2_emissions_assigned_to_freight_transport,
                    annual_average_co2_emissions_per_transport_work_freight,
                    annual_computed_ratio_co2_from_pax,
                    annual_monitoring_total_co2_emissions,
                    annual_average_co2_emissions_per_distance,
                    annual_computed_distance_km,
                    annual_monitoring_total_time_spent_at_sea,
                    annual_computed_pax,
                    annual_computed_freight,
                    annual_computed_average_speed,
                    monitoring_methods_json,
                    technical_efficiency_eiv,
                    technical_efficiency_eedi
                FROM thetis
                LEFT JOIN thetis_computed tc ON tc.imo = thetis.imo AND tc.reporting_period = thetis.reporting_period
                WHERE thetis.imo IN (%s)
            """ % (", ".join(imos)),
            db_con_all_ships
        )
        df.to_sql("thetis", db_www_con, if_exists="replace", index=False)


if __name__ == "__main__":
    CreateDB().run()
