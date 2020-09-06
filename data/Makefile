datasette_dev:
	datasette datasette/dbs/*.db --metadata datasette/metadata.yml --static static:datasette/static/ --reload

create_datasette_greenferries_db_from_prod:
	touch greenferries.db && rm greenferries.db
	ssh -T root@dokku-host 'dokku postgres:export greenferries-admin > greenferries_prod.sql'
	scp root@droplet:/root/greenferries_prod.sql ./greenferries_prod.sql
	ssh -T root@dokku-host 'rm greenferries_prod.sql'
	createdb greenferries_prod_tmp
	pg_restore -d greenferries_prod_tmp ./greenferries_prod.sql || true
	rm ./greenferries_prod.sql
	db-to-sqlite --skip admin_users --skip active_storage_attachments --skip active_storage_blobs --skip schema_migrations --skip ar_internal_metadata --all "postgresql://localhost/greenferries_prod_tmp" greenferries.db
	dropdb greenferries_prod_tmp

create_datasette_dbs_from_csvs:
	touch datasette/dbs/wikidata.db datasette/dbs/scrapings.db datasette/dbs/airports.db
	rm datasette/dbs/wikidata.db datasette/dbs/scrapings.db datasette/dbs/airports.db
	csvs-to-sqlite -t ships files_computed/wikidata_ships_2020_01_16.csv datasette/dbs/wikidata.db
	csvs-to-sqlite -t ship_routes files_computed/scraped_ship_routes_cleaned.2020_01_18.csv datasette/dbs/scrapings.db
	csvs-to-sqlite -t airports files_computed/airports.csv datasette/dbs/airports.db

datasette_deploy:
	datasette package datasette/dbs/*.db --metadata datasette/metadata.yml --static static:datasette/static/ --tag greenferries/datasette:$(VERSION)
	docker push greenferries/datasette:$(VERSION)
	ssh -T root@dokku-host 'docker pull greenferries/datasette:$(VERSION) && docker tag greenferries/datasette:$(VERSION) dokku/greenferries-data:$(VERSION) && dokku tags:deploy greenferries-data $(VERSION)'
