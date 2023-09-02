# python3 -m greenferries.www.thetis_df

import pandas as pd
from greenferries.db import get_connection

def get_df(only_last_year = False, only_in_scope = False):
    db_con = get_connection(db_name="www")
    wheres = []
    if only_last_year:
        wheres.append("thetis.reporting_period = (SELECT MAX(reporting_period) FROM thetis)")
    if only_in_scope:
        wheres.append("ships.out_of_scope = 0")
    return pd.read_sql_query(
        f"""
            SELECT thetis.*
            FROM thetis
            LEFT JOIN ships ON ships.imo = thetis.imo
            {f"WHERE {' AND '.join(wheres)}" if len(wheres) > 0 else ""}
        """,
        db_con
    )

if __name__ == "__main__":
    print(get_df(only_in_scope=True, only_last_year=True))

