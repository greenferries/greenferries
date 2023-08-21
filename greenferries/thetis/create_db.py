# python3 -m greenferries.thetis.create_db

import os, re, warnings
import pandas as pd
from greenferries.db import get_connection

def get_absolute_path(relative_path):
    return os.path.join(os.path.dirname(__file__), "..", "..", relative_path)

MAPPING_CSV_PATH = 'data_files/original.greenferries.thetis_columns_mapping.csv'

class CreateDB():
    def run(self):
        df_mapping = pd.read_csv(get_absolute_path(MAPPING_CSV_PATH))
        self.columns_renames = df_mapping.set_index('original_column_3')['reformatted_column'].to_dict()
        self.db_con = get_connection()
        # drop thetis table if exists
        self.db_con.execute("DROP TABLE IF EXISTS thetis")
        for filename in os.listdir(get_absolute_path("data_files")):
            match_data = re.match(r"original\.thetis\.export_(\d+)\.xlsx", filename)
            if not match_data:
                continue
            xlsx_path_relative = f"data_files/{filename}"
            self.feed_thetis_xlsx_into_db(xlsx_path_relative)

    def feed_thetis_xlsx_into_db(self, xlsx_path_relative):
        print(f"reading {xlsx_path_relative} ...")
        with warnings.catch_warnings(record=True):
            # cf https://stackoverflow.com/a/66749978
            warnings.simplefilter("always")
            df = pd.read_excel(get_absolute_path(xlsx_path_relative), header=2, na_values=["Division by zero!"])
        missing_column_mappings = set(df.columns.to_list()) - set(self.columns_renames.keys())
        if len(missing_column_mappings) > 0:
            raise Exception(f"missing column mappings for {missing_column_mappings}")
        df.rename(columns=self.columns_renames, inplace=True)
        df.to_sql("thetis", self.db_con, if_exists="append", index=False)
        rows_count = df.shape[0]
        print(f"inserted {rows_count} rows into db")

if __name__ == "__main__":
    CreateDB().run()
