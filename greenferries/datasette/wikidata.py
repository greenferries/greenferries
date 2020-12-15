import os
from greenferries.utils import run_sh, clean_file

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
CSV_PATH_SHIPS = os.path.join(PACKAGE_ROOT, f"files_original", "original.wikidata.ships.csv")
CSV_PATH_URLS = os.path.join(PACKAGE_ROOT, f"files_original", "original.wikidata.urls.csv")
DB_PATH = os.path.join(PACKAGE_ROOT, "..", "datasette", "dbs", "wikidata.db")

def create_db():
    clean_file(DB_PATH)
    run_sh(" ".join([
        "csvs-to-sqlite",
        "--table ships",
        "--primary-key wikidataUrl",
        "--index imo",
        "--index wikidataUrl",
        CSV_PATH_SHIPS,
        DB_PATH
    ]))
    run_sh(" ".join([
        "csvs-to-sqlite",
        "--table wikipedia_urls",
        "--primary-key wikidataUrl",
        "--index imo",
        CSV_PATH_URLS,
        DB_PATH
    ]))
    print(f"rewrote {DB_PATH}")
