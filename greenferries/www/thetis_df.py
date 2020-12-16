import os
import pandas as pd
from greenferries.www.frontmatter_df import get_df as get_frontmatter_df

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
THETIS_CSV_PATH = os.path.join(PACKAGE_ROOT, "..", "data_files", "thetis_all_with_computed.csv")


def monitoring_methods(row):
    monitoring_methods = []
    for letter in ["a", "b", "c", "d"]:
        if not pd.isna(row[f"monitoring_method_{letter}"]):
            monitoring_methods.append(letter)
    return monitoring_methods


def get_df(only_last_year=False, **kwargs):
    df_thetis = pd.read_csv(THETIS_CSV_PATH, dtype={"imo": str})
    df_thetis["monitoring_methods"] = df_thetis.apply(lambda row: monitoring_methods(row), axis=1)
    for letter in ["a", "b", "c", "d"]:
        del df_thetis[f"monitoring_method_{letter}"]
    md_imos = get_frontmatter_df(**kwargs).imo.apply(lambda x: str(x))
    df = df_thetis[df_thetis.imo.isin(md_imos)]
    if only_last_year:
      df = df[df.reporting_period == 2019]
    return df


if __name__ == "__main__":
    df = get_df()
    print("got df with %s rows" % df.shape[0])
