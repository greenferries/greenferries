import os
from greenferries.utils import run_sh, clean_file

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
CSV_PATH = os.path.join(PACKAGE_ROOT, "files_computed", "thetis_export_all.csv")
DB_PATH = os.path.join(PACKAGE_ROOT, "..", "datasette", "dbs", "thetis.db")

def create_db():
    clean_file(DB_PATH)
    command = (" ".join([
        "csvs-to-sqlite",
        "--table ships",
        "--primary-key imo",
        "--primary-key reporting_period",
        "--index imo",
        "--index reporting_period",
        "--index ship_type",
        CSV_PATH,
        DB_PATH
    ]))
    run_sh(command)
    print(f"rewrote {DB_PATH}")
