update_distances:
	heroku run rails runner 'DataFiller::Distance.new("all").perform'
