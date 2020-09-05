# Greenferries Data Platform

Live website to explore the data from the GreenFerries project: [data.greenferries.org](data.greenferries.org)

![https://i.imgur.com/43VjhWJ.png](https://i.imgur.com/43VjhWJ.png)

This repository exposes source data and transformed data
used by the [GreenFerries project](https://www.greenferries.org)

## Discuss

Feel free to open issues on this repository or come and discuss on the public chat room `#greenferries-data:matrix.org` : [https://riot.im/app/#/room/!ucRHvaqIzPZzjYnfTo:matrix.org?via=matrix.org](https://riot.im/app/#/room/!ucRHvaqIzPZzjYnfTo:matrix.org?via=matrix.org)

## Install

```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt -r requirements-dev.txt
```

## Original source data origins

You'll find the raw original files data in the `files_original` folder.

- `original.geonames.cities500.txt` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.geonames.countries` : from [Geonames](https://download.geonames.org/export/dump/)
- `original.greenferries.scraped_ship_routes` : from [Greenferries](https://github.com/greenferries/greenferries/tree/master/scrapers) scrapers
- `original.greenferries.thetis_columns_mapping.csv` : manually created 2020/01
- `original.our_airports.csv` : from [ourairports.com](https://ourairports.com/data/)
- `original.registre-navire-pro-?.csv` : ?
- `original.thetis.export_20?.?.csv` : from [THETIS](https://mrv.emsa.europa.eu/#public/emission-report) ⭐️ main data source ⭐️
- `original.wikidata.ships.?.csv` : from [wikidata](https://www.wikidata.org/), see below
- `original.wikidata.wikipedia_urls.?.csv` : from [wikidata](https://www.wikidata.org/), see below

## Usage

- To start the datasette server locally: `make datasette_dev`
- To play with the jupyter notebooks: `jupyter notebook`
- To prepare SQLite databases for datasette from computed CSV files : `make create_datasette_dbs_from_csvs`
- To retrieve production greenferries admin DB and convert it to a SQLite database for datasette : `make create_datasette_greenferries_db_from_prod`
- Deploy to production using `make deploy VERSION=v?.?` ⚠️ you'll need push access to the Docker Hub `greenferries` team and to have added your SSH key to the dokku server hosting the prod website

## Wikidata queries

### Wikidata - ships part 1 - [https://w.wiki/Fcn](https://w.wiki/Fcn)

```
SELECT
  ?item
  ?itemLabel
  ?imo
  ?mmsi
  ?shipTypeLabel
  ?countryCode
  ?image
  ?beam ?draft ?maximumCapacity ?length ?width ?grossTonnage
WHERE {
  ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
  OPTIONAL { ?item wdt:P458 ?imo. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  OPTIONAL { ?item wdt:P18 ?image. }
  OPTIONAL { ?item wdt:P587 ?mmsi. }
  ?item wdt:P31 ?shipType.
  OPTIONAL {
    ?item wdt:P17 ?country.
    ?country wdt:P297 ?countryCode.
  }
  OPTIONAL { ?item wdt:P2261 ?beam. }
  OPTIONAL { ?item wdt:P2262 ?draft. }
  OPTIONAL { ?item wdt:P1083 ?maximumCapacity. }
  OPTIONAL { ?item wdt:P2043 ?length. }
  OPTIONAL { ?item wdt:P2049 ?width. }
  OPTIONAL { ?item wdt:P1093 ?grossTonnage. }
}
```

store it as `files_original/original.wikidata.ships.part_1.DATE.csv`

## ships part 2 - [https://w.wiki/Fck](https://w.wiki/Fck)

```
SELECT
  ?item
  ?homeportLabel ?homeportCountryCode ?homeportGeonamesId
  ?ownerLabel ?ownerUrl ?ownerCountryCode
  ?operatorLabel ?operatorUrl ?operatorCountryCode
  ?manufacturerLabel ?manufacturerUrl ?manufacturerCountryCode
WHERE {
  ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  OPTIONAL {
    ?item wdt:P504 ?homeport.
    ?homeport wdt:P17 ?homeportCountry.
    ?homeportCountry wdt:P297 ?homeportCountryCode.
    ?homeport wdt:P1566 ?homeportGeonamesId.
  }
  OPTIONAL {
    ?item wdt:P127 ?owner.
    ?owner wdt:P856 ?ownerUrl.
    ?owner wdt:P17 ?ownerCountry.
    ?ownerCountry wdt:P297 ?ownerCountryCode.
  }
  OPTIONAL {
    ?item wdt:P137 ?operator.
    ?operator wdt:P856 ?operatorUrl.
    ?operator wdt:P17 ?operatorCountry.
    ?operatorCountry wdt:P297 ?operatorCountryCode.
  }
  OPTIONAL {
    ?item wdt:P176 ?manufacturer.
    ?manufacturer wdt:P856 ?manufacturerUrl.
    ?manufacturer wdt:P17 ?manufacturerCountry.
    ?manufacturerCountry wdt:P297 ?manufacturerCountryCode.
  }
}
```

store it as `files_original/original.wikidata.ships.part_2.DATE.csv`

## ships to wikipedia urls - [https://w.wiki/FbU](https://w.wiki/FbU)

```
SELECT ?item ?wikipediaUrl ?wikipediaLang
WHERE {
  ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  OPTIONAL {
    ?wikipediaUrl schema:about ?item;
      schema:inLanguage ?wikipediaLang.
    FILTER(REGEX(STR(?wikipediaUrl), ".wikipedia.org"))
  }
}
```

store it as `files_original/original.wikidata.wikipedia_urls.DATE.csv`


## Resources

- [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/)
- [datasette](https://github.com/simonw/datasette)
- [csvs-to-sqlite](https://github.com/simonw/csvs-to-sqlite)
