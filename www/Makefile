update_data:
	curl https://admin.greenferries.org/data_dump > public/shipsCompaniesAndRoutes.json
	jq '.version += 1' public/dataVersion.json -rc > public/newDataVersion.json
	mv public/newDataVersion.json public/dataVersion.json
	cat public/airportsArray.json | jq '{airports: .}' > public/airports.json
	jq -s '.[0] * .[1] * .[2] * .[3]' public/airports.json public/countries.json public/shipsCompaniesAndRoutes.json public/dataVersion.json | jq -s add -rc > public/data.json

update_data_local:
	curl http://localhost:5000/data_dump > public/shipsCompaniesAndRoutes.json
	jq '.version += 1' public/dataVersion.json -rc > public/newDataVersion.json
	mv public/newDataVersion.json public/dataVersion.json
	jq -s '.[0] * .[1] * .[2] * .[3]' public/airports.json public/countries.json public/shipsCompaniesAndRoutes.json public/dataVersion.json | jq -s add -rc > public/data.json
