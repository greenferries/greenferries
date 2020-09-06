import sys
import os
from refresh_original_files import Refresher
from convert_thetis_xlsx_to_csv import Converter

# python3 scripts/prepare_data.py

DIRNAME = os.path.dirname(__file__)

class PrepareData():
    def __init__(self):
        pass

    def run_thetis(self):
        db_path = os.path.join(DIRNAME, f"../datasette/dbs/thetis.db")
        self.run_sh(f"touch {db_path} && rm {db_path}")
        for year in ["2018", "2019"]:
            csv_path = os.path.join(DIRNAME, f"../files_computed/thetis_export_{year}.csv")
            xlsx_path = os.path.join(DIRNAME, f"../files_original/original.thetis.export_{year}.xlsx")
            # Refresher(f"thetis_{year}").run()
            # Converter(xlsx_path, csv_path).run()
        csv_glob_path = os.path.join(DIRNAME, f"../files_computed/thetis_export_*.csv")
        csv_all_path = os.path.join(DIRNAME, f"../files_computed/thetis_export_all.csv")
        self.run_sh(f"touch {csv_all_path} && rm {csv_all_path}")
        self.run_sh(f"awk '(NR == 1) || (FNR > 1)' {csv_glob_path} > {csv_all_path}")
        command = (" ".join([
            "csvs-to-sqlite",
            "--table ships",
            "--primary-key imo",
            "--primary-key reporting_period",
            "--index imo",
            "--index reporting_period",
            "--index ship_type",
            csv_all_path,
            db_path
        ]))
        self.run_sh(command)

    def run_sh(self, command):
        res = os.system(command)
        if res != 0:
            print(f"Error while running `{command}`, aborting!")
            exit(1)

    def run(self):
        self.run_thetis()


if __name__ == "__main__":
    PrepareData().run()
