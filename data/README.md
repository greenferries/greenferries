# Greenferries Data Platform

Live website to explore the data from the GreenFerries project: [data.greenferries.org](data.greenferries.org)

![https://i.imgur.com/43VjhWJ.png](https://i.imgur.com/43VjhWJ.png)

This repository exposes source data and transformed data
used by the [GreenFerries project](https://www.greenferries.org)

## Discuss

Feel free to open issues on this repository or come and discuss on the [public gitter chat room #greenferries](https://gitter.im/greenferries/community)

## Install

```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

## Original source data origins

You'll find the raw original files data in the `files_original` folder.

- `original.geonames.cities500.txt` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.geonames.countries` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.greenferries.scraped_ship_routes` : from [Greenferries](https://github.com/greenferries/greenferries/tree/master/scrapers) scrapers
- `original.greenferries.thetis_columns_mapping.csv` : manually created 2020/01
- `original.our_airports.csv` : from [ourairports.com](https://ourairports.com/data/)
- `original.thetis.export_20??.csv` : from [THETIS](https://mrv.emsa.europa.eu/#public/emission-report) ⭐️ main data source ⭐️
- `original.wikidata.ships.csv` : from [wikidata](https://www.wikidata.org/), see below
- `original.wikidata.urls.csv` : from [wikidata](https://www.wikidata.org/), see below

## Local usage

To play with the jupyter notebooks simply use `jupyter notebook`

You can start the datasette server locally with `make datasette_dev`.

To prepare the SQLite DBs files used by datasette:

- `python3 scripts/full_pipeline.py` will prepare `wikidata.db` and `thetis.db`. This script can be slow as it will re-fetch and re-convert the data from the most up to date versions.
- `make convert_ship_routes_scrapings_csv_to_sqlite_db`
- `make convert_airports_csv_to_sqlite_db`
- `make create_datasette_greenferries_db_from_prod` to retrieve production greenferries admin DB and convert it to a SQLite database for datasette :

## Production setup & deploy for datasette

Datasette runs on [data.greenferries.org](https://data.greenferries.org) through
a dokku host.

Here is how it is setup, more or less:

```sh
# create a dokku app and deploy the datasette docker image onto it
dokku apps:create greenferries-data
docker pull datasetteproject/datasette
docker tag datasetteproject/datasette dokku/greenferries-data:v0.2.1
dokku tags:deploy greenferries-data v0.2.1

# share a persistent volume
dokku storage:mount greenferries-data \
  /var/lib/dokku/data/storage/greenferries-data:/data

# from your local host, copy all necessary files
scp -r data/datasette/* root@zagreb:/var/lib/dokku/data/storage/greenferries-data/

# set the default run command
dokku config:set greenferries-data \
  DOKKU_DOCKERFILE_START_CMD="datasette -p 5000 -h 0.0.0.0 --metadata /data/metadata.yml --static static:/data/static/ /data/dbs"
```

To release new data to the production you simply need to upload the files
and restart the dokku container with `make datasette_deploy`.

## Resources

- [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/)
- [datasette](https://github.com/simonw/datasette)
- [csvs-to-sqlite](https://github.com/simonw/csvs-to-sqlite)
