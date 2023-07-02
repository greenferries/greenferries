# GreenFerries

*Improve passenger ships environmental impact transparency*

Live website: [greenferries.org](https://www.greenferries.org)

[![Netlify Status](https://api.netlify.com/api/v1/badges/214d136b-2a50-41c0-b028-643e8352c1b6/deploy-status)](https://app.netlify.com/sites/greenferries/deploys)
![Lint Standard JS](https://github.com/greenferries/greenferries/workflows/Lint%20Standard%20JS/badge.svg)
[![Gitter chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/greenferries/community)


## `/www` greenferries.org frontend Website

![GreenFerries](https://i.imgur.com/7RVgLVD.jpg)

The code for the main public-facing static website. Built with [Eleventy - Static Site Generator](https://www.11ty.dev/docs/). [TailwindCSS](https://tailwindcss.com/)

To run the server locally, simply run `yarn start` from `/www`

To deploy, simply push the main monorepository master branch, Netlify is configured to
deploy the `www` directory automatically


## `/greenferries` Python library to fetch and process the data

datasets, APIs and iPython notebooks to explore the different original data
sources that were used to create the GreenFerries database

Install with:

```sh
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

The main entry point is `full_pipeline` which will download, convert and process all necessary files for the frontend website and the datasette platform.

Run it with `python3 -m greenferries.full_pipeline` from the root of this repository.

You will first need to register on wikidata and add your credentials to `greenferries/.env` :

```sh
WIKIDATA_USERNAME=jean
WIKIDATA_PASSWORD=123456
```

## `/notebooks`

[Jupyter Python notebooks]((https://jupyter-notebook.readthedocs.io/en/stable/)) to play around and explore the different datasets.

Simply start `jupyter notebook` from `/notebooks`.


## `/datasette` data.greenferries.org platform

![https://i.imgur.com/43VjhWJ.png](https://i.imgur.com/43VjhWJ.png)

Live website to explore the data from the GreenFerries project: [data.greenferries.org](https://data.greenferries.org). Exposes data processed by the `greenferries` python library mentioned above. Built with the amazing [`datasette`](https://github.com/simonw/datasette) and [csvs-to-sqlite](https://github.com/simonw/csvs-to-sqlite).

To run locally: `make dev` from `/datasette`.

Datasette runs on [data.greenferries.org](https://data.greenferries.org) through
a dokku host.

Here is how it is setup (more or less):

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
and restart the dokku container with a git push subtree.


## `/scrapers`

Scrapers initially used to populate data from the [directferries.fr](http://directferries.fr/) booking website. (old code).

- `getAllRoutes.js` fetches all ship routes from [ferries.fr](https://www.ferries.fr/)
- `index.js` iterates over the routes and fills up a MongoDB collection with
the ships infos found on directferries


## raw data files

You'll find the raw data files (CSV and XLSX) in the `/data_files` folder.

- `original.geonames.cities500.txt` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.geonames.countries` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.greenferries.scraped_ship_routes` : from [Greenferries](https://github.com/greenferries/greenferries/tree/master/scrapers) scrapers
- `original.greenferries.thetis_columns_mapping.csv` : manually created 2020/01
- `original.our_airports.csv` : from [ourairports.com](https://ourairports.com/data/)
- `original.thetis.export_20??.csv` : from [THETIS](https://mrv.emsa.europa.eu/#public/emission-report) ⭐️ main data source ⭐️
- `original.wikidata.ships.csv` : from [wikidata](https://www.wikidata.org/), see below
- `original.wikidata.urls.csv` : from [wikidata](https://www.wikidata.org/), see below
