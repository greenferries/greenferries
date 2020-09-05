dev:
	datasette greenferries.db thetis.db wikidata.db scrapings.db airports.db --metadata metadata.yml --static static:datasette_static/ --reload

create_admin_db:
	touch greenferries.db && rm greenferries.db
	ssh -T root@dokku-host 'dokku postgres:export greenferries-admin > greenferries_prod.sql'
	scp root@droplet:/root/greenferries_prod.sql ./greenferries_prod.sql
	ssh -T root@dokku-host 'rm greenferries_prod.sql'
	createdb greenferries_prod_tmp
	pg_restore -d greenferries_prod_tmp ./greenferries_prod.sql || true
	rm ./greenferries_prod.sql
	db-to-sqlite --skip admin_users --skip active_storage_attachments --skip active_storage_blobs --skip schema_migrations --skip ar_internal_metadata --all "postgresql://localhost/greenferries_prod_tmp" greenferries.db
	dropdb greenferries_prod_tmp

create_csv_dbs:
	touch thetis.db wikidata.db scrapings.db
	rm thetis.db wikidata.db scrapings.db
	csvs-to-sqlite -t ships thetis_mrv_2019_12_24.csv thetis.db
	csvs-to-sqlite -t ships wikidata_ships_2020_01_16.csv wikidata.db
	csvs-to-sqlite -t ship_routes scraped_ship_routes_2020_01_18.cleaned.csv scrapings.db
	csvs-to-sqlite -t airports airports.filtered.csv airports.db

deploy:
	datasette package greenferries.db thetis.db wikidata.db scrapings.db airports.db --metadata metadata.yml --static static:datasette_static/ --tag greenferries/datasette:$(VERSION)
	docker push greenferries/datasette:$(VERSION)
	ssh -T root@dokku-host 'docker pull greenferries/datasette:$(VERSION) && docker tag greenferries/datasette:$(VERSION) dokku/greenferries-data:$(VERSION) && dokku tags:deploy greenferries-data $(VERSION)'
