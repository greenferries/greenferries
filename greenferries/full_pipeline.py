# python3 -m greenferries.full_pipeline

from greenferries.thetis.download import Download as ThetisDownload
from greenferries.thetis.create_db import CreateDB as ThetisCreateDB
from greenferries.thetis.augment import Augment as ThetisAugment
from greenferries.wikidata.download_ships import DownloadShips as WikidataDownloadShips
from greenferries.wikidata.download_urls import DownloadUrls as WikidataDownloadUrls
from greenferries.www.db import create_db as www_create_db
from greenferries.www.ecoscore import create_files as www_ecoscore_create_files
from greenferries.www.monitoring_methods import create_files as www_monitoring_methods_create_files
from greenferries.www.technical_efficiency import create_files as www_technical_efficiency_create_files

def run():
    # thetis
    for year in ["2018", "2019", "2020", "2021", "2022"]:
        ThetisDownload(year).run()
    ThetisCreateDB().run()
    ThetisAugment().run()

    # wikidata
    # WikidataDownloadShips().run()
    # WikidataDownloadUrls().run()

    # www
    www_create_db()
    www_monitoring_methods_create_files()
    www_technical_efficiency_create_files()
    www_ecoscore_create_files()

    # TODO create indexes
    # wikidata.ships --primary-key wikidataUrl --index imo --index wikidataUrl \
    # wikidata-urls --primary-key wikidataUrl --index imo \
    # thetis --primary-key imo --primary-key reporting_period --index imo --index reporting_period --index ship_type

if __name__ == "__main__":
    run()
