import sys
import os
from download import Download
from convert_thetis_xlsx_to_csv import ConvertThetisXlsxToCsv
from compute_inferred_values import ComputeInferredValues
from ecoscore import CreateEcoscoreWwwDataFilesAndPlots

from www import write_thetis_jsons, export_monitoring_methods_graph, export_technical_efficiency_graph_and_json
# python3 scripts/full_pipeline.py

DIRNAME = os.path.dirname(__file__)
THETIS_ALL_PATH = os.path.join(DIRNAME, "../files_computed/thetis_export_all.csv")
THETIS_XLSX_PATH_YEAR_TEMPLATE = os.path.join(DIRNAME, "../files_original/original.thetis.export_%s.xlsx")
THETIS_CSV_PATH_YEAR_TEMPLATE = os.path.join(DIRNAME, "../files_computed/thetis_export_%s.csv")
THETIS_DATASETTE_DB_PATH = os.path.join(DIRNAME, "../datasette/dbs/thetis.db")
WIKIDATA_SHIPS_CSV_PATH = os.path.join(DIRNAME, f"../files_original/original.wikidata.ships.csv")
WIKIDATA_URLS_CSV_PATH = os.path.join(DIRNAME, f"../files_original/original.wikidata.urls.csv")
WIKIDATA_DATASETTE_DB_PATH = os.path.join(DIRNAME, "../datasette/dbs/wikidata.db")

def run_sh(command):
    res = os.system(command)
    if res != 0:
        print(f"Error while running `{command}`, aborting!")
        exit(1)

def clean_file(filepath):
    run_sh(f"touch {filepath} && rm {filepath}")


class FullPipeline():
    def run(self):
        self.prepare_thetis_files()
        self.prepare_wikidata_files()
        self.prepare_www_files()

    def prepare_thetis_files(self):
        for year in ["2018", "2019"]:
            Download(f"thetis_{year}").run()
            ConvertThetisXlsxToCsv(THETIS_XLSX_PATH_YEAR_TEMPLATE % year, THETIS_CSV_PATH_YEAR_TEMPLATE % year).run()
        self.join_thetis_csvs()
        ComputeInferredValues().run()

        self.create_thetis_datasette_sqlite_db()

    def create_thetis_datasette_sqlite_db(self):
        clean_file(THETIS_DATASETTE_DB_PATH)
        command = (" ".join([
            "csvs-to-sqlite",
            "--table ships",
            "--primary-key imo",
            "--primary-key reporting_period",
            "--index imo",
            "--index reporting_period",
            "--index ship_type",
            THETIS_ALL_PATH,
            THETIS_DATASETTE_DB_PATH
        ]))
        run_sh(command)

    def join_thetis_csvs(self):
        glob_path = os.path.join(DIRNAME, f"../files_computed/thetis_export_*.csv")
        clean_file(THETIS_ALL_PATH)
        run_sh(f"awk '(NR == 1) || (FNR > 1)' {glob_path} > {THETIS_ALL_PATH}")

    def prepare_wikidata_files(self):
        clean_file(WIKIDATA_DATASETTE_DB_PATH)
        Download("wikidata_ships").run()
        Download("wikidata_urls").run()
        run_sh(" ".join([
            "csvs-to-sqlite",
            "--table ships",
            "--primary-key wikidataUrl",
            "--index imo",
            "--index wikidataUrl",
            WIKIDATA_SHIPS_CSV_PATH,
            WIKIDATA_DATASETTE_DB_PATH
        ]))
        run_sh(" ".join([
            "csvs-to-sqlite",
            "--table wikipedia_urls",
            "--primary-key wikidataUrl",
            "--index imo",
            WIKIDATA_URLS_CSV_PATH,
            WIKIDATA_DATASETTE_DB_PATH
        ]))

    def prepare_www_files(self):
        write_thetis_jsons()
        export_monitoring_methods_graph()
        export_technical_efficiency_graph_and_json()
        CreateEcoscoreWwwDataFilesAndPlots().run()

if __name__ == "__main__":
    FullPipeline().run()
