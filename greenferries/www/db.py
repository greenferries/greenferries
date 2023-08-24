# python3 -m greenferries.www.db

import pandas as pd
from greenferries.db import get_connection


class CreateDB(object):
    def run(self):
        db_www_con = get_connection(db_name="www")
        db_www_cur = db_www_con.cursor()
        imos = [r[0] for r in db_www_cur.execute("SELECT imo FROM ships").fetchall()]

        db_con_all_ships = get_connection(db_name="all_ships")
        df = pd.read_sql_query(
            """
                SELECT
                    thetis.imo,
                    thetis.reporting_period,
                    computed_ecoscore_letter,
                    annual_monitoring_co2_emissions_assigned_to_passenger_transport,
                    annual_average_co2_emissions_per_transport_work_pax,
                    annual_computed_average_co2_emissions_per_transport_work_pax_km,
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
        print(f"saved {len(df)} rows to thetis")

        rows = db_www_cur.execute(
            """
                SELECT
                    imo, reporting_period, computed_ecoscore_letter,
                    annual_computed_average_co2_emissions_per_transport_work_pax_km
                FROM thetis
                GROUP BY imo
                HAVING MAX(reporting_period)
            """
        ).fetchall()
        for row in rows:
            imo, reporting_period, computed_ecoscore_letter, ecoscore_figure = row
            db_www_cur.execute(
                """
                    UPDATE ships
                    SET
                        most_recent_reporting_period = ?,
                        ecoscore_letter = ?,
                        ecoscore_figure = ?
                    WHERE imo = ?
                """,
                (reporting_period, computed_ecoscore_letter, ecoscore_figure, imo)
            )
            db_www_con.commit()
        print(f"updated {len(rows)} ecoscores in ships (denormalized)")


if __name__ == "__main__":
    CreateDB().run()
