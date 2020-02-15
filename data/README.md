# Greenferries - data

Live website to explore the data from the GreenFerries project: [data.greenferries.org](data.greenferries.org)

![https://i.imgur.com/43VjhWJ.png](https://i.imgur.com/43VjhWJ.png)

This repository exposes source data and transformed data
used by the [GreenFerries project](https://www.greenferries.org)

## Discuss

Feel free to open issues on this repository or come and discuss on the public chat room `#greenferries-data:matrix.org` : [https://riot.im/app/#/room/!ucRHvaqIzPZzjYnfTo:matrix.org?via=matrix.org](https://riot.im/app/#/room/!ucRHvaqIzPZzjYnfTo:matrix.org?via=matrix.org)

## Install

`pip3 install -r requirements.txt -r requirements-dev.txt`

##

- Prepare SQLite databases from CSV files with `make create_csv_dbs`
- Prepare SQLite database from the admin database with `make create_admin_db DB_URL=postgresql://greenferries_prod`

## Local usage

To start the datasette server locally:

`make dev`

To play with the jupyter notebooks:

`jupyter notebook`

## Deploy with Dokku through a Docker Hub image

⚠️ you'll need push access to the Docker Hub `greenferries` team and to have
added your SSH key to the dokku server hosting the prod website.

`make deploy VERSION=v0.3`

## Resources

- [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/)
- [datasette](https://github.com/simonw/datasette)
- [csvs-to-sqlite](https://github.com/simonw/csvs-to-sqlite)
