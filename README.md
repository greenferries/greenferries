# GreenFerries

*Improve passenger ships environmental impact transparency*

Live website: [greenferries.org](https://www.greenferries.org)

[![Netlify Status](https://api.netlify.com/api/v1/badges/214d136b-2a50-41c0-b028-643e8352c1b6/deploy-status)](https://app.netlify.com/sites/greenferries/deploys)
![Lint Standard JS](https://github.com/greenferries/greenferries/workflows/Lint%20Standard%20JS/badge.svg)
[![Gitter chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/greenferries/community)


## `/www` greenferries.org frontend Website

![GreenFerries](https://i.imgur.com/7RVgLVD.jpg)

The code for the main public-facing static website. Built with [Eleventy - Static Site Generator](https://www.11ty.dev/docs/) + [TailwindCSS](https://tailwindcss.com/)

To install run `make install-node` and `make www-dev`.

To deploy, simply push the main monorepository master branch, Netlify is configured to
build and deploy the 11ty website from the `www` subdirectory automatically.


## `/greenferries` Python library

This python library fetches and processes the raw data from THETIS and wikidata, and turns it into SQLite databases.

Install with: `make install-python`

The main entry point is `full_pipeline` which will download, convert and process all necessary files for the frontend website and the datasette platform.

Run it with `make full-data-pipeline` from the root of this repository.

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

To run locally: `make datasette-dev` from the repository root.

In production, datasette is hosted on a Raspberry Pi 3 at [data.greenferries.org](https://data.greenferries.org) through a Caddy reverse proxy.

## raw data files

You'll find the raw data files (CSV and XLSX) in the `/data_files` folder.

- `original.thetis.export_20??.csv` : from [THETIS](https://mrv.emsa.europa.eu/#public/emission-report) ⭐️ main data source ⭐️
- `original.geonames.cities500.txt` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.geonames.countries` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.greenferries.thetis_columns_mapping.csv` : manually created in 2020, updated in 2023
- `original.our_airports.csv` : from [ourairports.com](https://ourairports.com/data/)
