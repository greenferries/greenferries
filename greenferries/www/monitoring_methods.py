# python3 -m greenferries.www.monitoring_methods

import os, json
import matplotlib.pyplot as plt
from greenferries.www.thetis_df import get_df as get_www_thetis_df

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
WWW_IMG_PATH = os.path.join(PACKAGE_ROOT, "../www/img")


def create_files():
    plt.clf()
    df = get_www_thetis_df(only_last_year=True, only_in_scope=True)
    data = df.monitoring_methods_json \
        .apply(lambda m: json.loads(m)) \
        .apply(lambda ms: "-".join([msc.capitalize() for msc in ms]) or "n/a") \
        .value_counts()
    plot = data.plot.bar()
    plot.set_xlabel("Monitoring Method")
    plot.set_ylabel(f"Ships count (total: {df.shape[0]})")
    path = os.path.join(WWW_IMG_PATH, "doc_monitoring_methods_distribution.svg")
    plot.figure.savefig(path, format="svg")
    print(f"rewrote {path}")


if __name__ == "__main__":
    create_files()
