# python3 -m greenferries.www.thetis_df

import pandas as pd
from greenferries.db import get_connection
from greenferries.www.frontmatter_df import get_df as get_frontmatter_df


def get_df(only_last_year=False, **kwargs):
    db_con = get_connection()
    imos = get_frontmatter_df(**kwargs).imo.to_list()
    years = ["2018", "2019", "2020", "2021", "2022"]
    if only_last_year:
        years = [years.pop()]
    df = pd.read_sql_query(
        """
            SELECT *
            FROM thetis
            LEFT JOIN thetis_computed tc ON tc.imo = thetis.imo AND tc.reporting_period = thetis.reporting_period
            WHERE thetis.imo IN (%s)
            AND thetis.reporting_period IN (%s)
        """ % (", ".join(imos),", ".join(years)),
        db_con
    )
    return df


if __name__ == "__main__":
    df = get_df()
    print("got df with %s rows" % df.shape[0])
