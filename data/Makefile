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

convert_csvs_to_sqlite_db:
	# source venv/bin/activate
	csvs-to-sqlite --replace-tables --table scraped_ship_routes files_computed/scraped_ship_routes_cleaned.2020_01_18.csv datasette/dbs/greenferries.db
	csvs-to-sqlite --replace-tables --table airports files_computed/airports.csv datasette/dbs/greenferries.db
	./scripts/csvs_to_sqlite_thetis.sh
