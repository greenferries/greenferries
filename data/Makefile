activate_venv:
	source venv/bin/activate

datasette_dev:
	source venv/bin/activate
	datasette datasette/dbs/*.db --metadata datasette/metadata.yml --static static:datasette/static/ --reload

create_datasette_greenferries_db_from_prod:
	source venv/bin/activate
	rm datasette/dbs/greenferries.db || true
	dropdb greenferries_prod_tmp || true
	heroku pg:pull postgresql-concave-26966 greenferries_prod_tmp
	db-to-sqlite --skip admin_users --skip schema_migrations --skip ar_internal_metadata --all "postgresql://localhost/greenferries_prod_tmp" datasette/dbs/greenferries.db

convert_ship_routes_scrapings_csv_to_sqlite_db:
	source venv/bin/activate
	touch datasette/dbs/scrapings.db
	rm datasette/dbs/scrapings.db
	csvs-to-sqlite -t ship_routes files_computed/scraped_ship_routes_cleaned.2020_01_18.csv datasette/dbs/scrapings.db

convert_airports_csv_to_sqlite_db:
	source venv/bin/activate
	touch datasette/dbs/airports.db
	rm datasette/dbs/airports.db
	csvs-to-sqlite -t airports files_computed/airports.csv datasette/dbs/airports.db
