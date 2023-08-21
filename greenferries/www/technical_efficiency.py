# python3 -m greenferries.www.technical_efficiency

import matplotlib.pyplot as plt
import os, json
from greenferries.www.thetis_df import get_df as get_www_thetis_df

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
WWW_IMG_PATH = os.path.join(PACKAGE_ROOT, "../www/img")
WWW_DOC_PATH = os.path.join(PACKAGE_ROOT, "../www/11ty_input/doc")

def create_files():
    df = get_www_thetis_df(only_in_scope=True, only_last_year=True)
    plt.clf()
    plot = df.plot.scatter(
        x="annual_computed_average_co2_emissions_per_transport_work_pax_km",
        y="technical_efficiency_eiv",
        xlim=(0,1000),
        ylim=(0,200)
    )
    plot.set_ylabel("EIV - gCO₂/ton/n.mile")
    plot.set_xlabel("Average emissions reported - gCO₂/km/person")
    svg_path = os.path.join(WWW_IMG_PATH, "doc_technical_efficiency_correlation.svg")
    plot.figure.savefig(svg_path, format="svg")
    print(f"rewrote {svg_path}")

    path = os.path.join(WWW_DOC_PATH, f"technical_efficiency.11tydata.json")
    with open(path, 'w') as f:
        json.dump({
            "shipsWithEivCount": df[~df.technical_efficiency_eiv.isnull()].shape[0],
            "shipsWithEediCount": df[~df.technical_efficiency_eedi.isnull()].shape[0],
            "shipsWithoutTechnicalEfficiencyCount": df[df.technical_efficiency_eiv.isnull() & df.technical_efficiency_eedi.isnull()].shape[0]
        }, f, indent=2)
    print(f"rewrote {path}")

if __name__ == "__main__":
    create_files()
