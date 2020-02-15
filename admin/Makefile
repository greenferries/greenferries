update_distances:
	heroku run -a green-ferries-admin rails runner 'DataFiller::Distance.new("all").perform'

count_fillable:
	heroku run rails runner -a green-ferries-admin 'puts Ship.treatable.with_g_co2_per_mile_pax.without_routes.count'
