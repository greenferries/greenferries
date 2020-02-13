toulon = City.create!(name: "Toulon", country: "FR", latitude: 43.1166700, longitude: 5.9333300)
ajaccio = City.create!(name: "Ajaccio", country: "FR", latitude: 41.9272300, longitude: 8.7346200)

corsica_ferries = Company.create!(name: "Corsica Ferries", country: "FR", wikipedia_url: "https://fr.wikipedia.org/wiki/Corsica_Ferries_-_Sardinia_Ferries")

mega_andrea = Ship.create!(name: "Mega Andrea", imo: 8306498, company: corsica_ferries, thetis_average_co2_per_pax: 75.54, data_source: 'THETIS-MRV-2019', wikipedia_url: 'https://fr.wikipedia.org/wiki/Mega_Andrea')

route_toulon_ajaccio = Route.create!(city_a: toulon, city_b: ajaccio, distance_km: 432)

mega_andrea.routes = [route_toulon_ajaccio]
mega_andrea.save!

AdminUser.create!(email: 'admin@greenferries.org', password: 'green123', password_confirmation: 'green123') if Rails.env.development?
