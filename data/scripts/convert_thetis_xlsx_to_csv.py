# python3 scripts/convert_thetis_xlsx_to_csv.py files_original/original.thetis.export_2018.2019_12_24.xlsx files_computed/thetis_mrv_2019_12_24.csv

from openpyxl import load_workbook
import openpyxl
import csv
import sys
import os
DIRNAME = os.path.dirname(__file__)
MAPPING_CSV_PATH = os.path.join(
    DIRNAME,
    '../files_original/original.greenferries.thetis_columns_mapping.csv'
)

def get_reformatted_columns():
    with open(MAPPING_CSV_PATH, 'r') as f:
        mapping_csv = csv.DictReader(f)
        return [{'name': r['reformatted_column'], 'data_type': r['data_type']} for r in mapping_csv]


def prepare(xlsx_path, csv_path):
    reformatted_columns = get_reformatted_columns()
    workbook = load_workbook(filename=xlsx_path)
    for sheetname in workbook.sheetnames:
        sheet = workbook[sheetname]
        with open(csv_path, 'w') as f:
            c = csv.writer(f)
            c.writerow([r['name'] for r in reformatted_columns])
            for row_idx, row in enumerate(sheet.rows):
                if row_idx < 3:
                    continue
                reformatted_row = []
                for col_idx, cell in enumerate(row):
                    if cell.value in ['Missing source values!', 'N/A', None]:
                        cell_value = None
                    elif reformatted_columns[col_idx]['data_type'] == 'float':
                        cell_value = float(cell.value)
                    else:
                        cell_value = cell.value
                    reformatted_row.append(cell_value)
                c.writerow(reformatted_row)


if __name__ == "__main__":
    prepare(sys.argv[1], sys.argv[2])
