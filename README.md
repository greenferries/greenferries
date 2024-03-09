# GreenFerries

*Improve passenger ships environmental impact transparency*

- Public website: [greenferries.netlify.app](https://greenferries.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/214d136b-2a50-41c0-b028-643e8352c1b6/deploy-status)](https://app.netlify.com/sites/greenferries/deploys)
![Lint Standard JS](https://github.com/greenferries/greenferries/workflows/Lint%20Standard%20JS/badge.svg)

> [!WARNING]
> This project was created in 2020 and last updated in 2023 but it is now idle.
> The data may be outdated and information presented should be double checked.
> Please get in touch if you would like to help!

## `/www` greenferries.netlify.app frontend Website

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

run with `make notebooks-server`


## `/datasette` platform

website & API to explore the data from the GreenFerries project: [data.greenferries.netlify.app](https://data.greenferries.netlify.app). Exposes data processed by the `greenferries` python library mentioned above. Built with the amazing [`datasette`](https://github.com/simonw/datasette) and [csvs-to-sqlite](https://github.com/simonw/csvs-to-sqlite).

To run locally: `make datasette-dev` from the repository root.

## raw data files

You'll find the raw data files (CSV and XLSX) in the `/data_files` folder.

- `original.thetis.export_20??.csv` : from [THETIS](https://mrv.emsa.europa.eu/#public/emission-report) ⭐️ main data source ⭐️
- `original.geonames.cities500.txt` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.geonames.countries` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.greenferries.thetis_columns_mapping.csv` : manually created in 2020, updated in 2023
- `original.our_airports.csv` : from [ourairports.com](https://ourairports.com/data/)
