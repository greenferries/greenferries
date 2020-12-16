# ex: python3 -m greenferries.thetis.download 2019

import requests, re, os, sys, datetime
from greenferries.metadata import update_metadata

THETIS_FILENAME_REGEX = r"%s\-(v\d+)\-(\d{2})(\d{2})(\d{4})\-.*"
# like "2018-v226-05092020-EU MRV Publication of information.xlsx"
PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")

# from https://www.codementor.io/@aviaryan/downloading-files-from-urls-in-python-77q3bs0un
def get_filename_from_content_disposition_header(cdh):
    if not cdh:
        return None
    match = re.match(r".*filename=\"?(.+)\"?.*", cdh)
    if match is None:
        return None
    return match.groups()[0]

class Download(object):
    def __init__(self, year):
        self.year = year
        self.metadata = {}

    def run(self):
        self.download_thetis_file(self.year)
        update_metadata(self.metadata)
        print("done!")

    def download_thetis_file(self, report_year):
        print(f"downloading THETIS file for year {report_year}...")
        url = f"https://mrv.emsa.europa.eu/api/public-emission-report/reporting-period-document/binary/{report_year}"
        res = requests.get(url, allow_redirects=True)
        raw_filename = get_filename_from_content_disposition_header(res.headers.get('Content-Disposition'))
        version, date, month, year = re.match(THETIS_FILENAME_REGEX % report_year, raw_filename).groups()
        filekey = f"thetis.export_{report_year}"
        filename = f"original.{filekey}.xlsx"
        filepath = os.path.join(PACKAGE_ROOT, "..", "data_files", filename)
        self.metadata[filekey] = {
            "date": f"{year}-{month}-{date}",
            "filename": filename,
            "version": version
        }
        open(filepath, 'wb').write(res.content)
        print(f"√ wrote {filepath}")

if __name__ == "__main__":
    Download(sys.argv[1]).run()
