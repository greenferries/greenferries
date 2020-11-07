activate_venv:
	source venv/bin/activate

datasette_dev:
	source venv/bin/activate
	datasette datasette/dbs/*.db --metadata datasette/metadata.yml --static static:datasette/static/ --reload

convert_csvs_to_sqlite_db:
	# source venv/bin/activate
	csvs-to-sqlite --replace-tables --table scraped_ship_routes files_computed/scraped_ship_routes_cleaned.2020_01_18.csv datasette/dbs/greenferries.db
	csvs-to-sqlite --replace-tables --table airports files_computed/airports.csv datasette/dbs/greenferries.db
	./scripts/csvs_to_sqlite_thetis.sh
