# python3 -m greenferries.full_pipeline

import sys
import os
from greenferries.thetis.download import Download as ThetisDownload
from greenferries.thetis.convert import Convert as ThetisConvert
from greenferries.thetis.augment import Augment as ThetisAugment
from greenferries.wikidata.download import Download as WikidataDownload
from greenferries.datasette.thetis import create_db as create_thetis_db
from greenferries.datasette.wikidata import create_db as create_wikidata_db
from greenferries.www.ecoscore import create_files as www_ecoscore_create_files
from greenferries.www.thetis import create_files as www_thetis_create_files
from greenferries.www.monitoring_methods import create_files as www_monitoring_methods_create_files
from greenferries.www.technical_efficiency import create_files as www_technical_efficiency_create_files

def run():
    # thetis
    for year in ["2018", "2019"]:
        ThetisDownload(year).run()
    ThetisConvert().run()
    ThetisAugment().run()
    create_thetis_db()

    # wikidata
    WikidataDownload("ships").run()
    WikidataDownload("urls").run()
    create_wikidata_db()

    # www
    www_thetis_create_files()
    www_monitoring_methods_create_files()
    www_technical_efficiency_create_files()
    www_ecoscore_create_files()

if __name__ == "__main__":
    run()
