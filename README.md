# GreenFerries Admin

*Improve passenger ships environmental impact transparency*

Live website: [admin.greenferries.org](http://admin.greenferries.org)

![GreenFerries Admin](https://i.imgur.com/1lznLmP.png)

This admin is a very simple CRUD backend for the GreenFerries database

## Local Setup

Make sure you're running Ruby 2.6.5+

```
gem install bundler
bundle install
rails db:create db:migrate db:seed
```

## Local Development

```
heroku local
```

## Glossary for THETIS and Transport Ships Industry

- Laden vs ballast voyages: a 'ballast voyage' is a voyage without any cargo
loaded whereas a laden is one with cargo loaded. Laden means the cargo.
- DWT : DeadWeight Tonnage is the max weight a cargo can carry (WITHOUT the
ship's weight). It's sometimes abusively used to mean the weight of the actual
currently loaded cargo, not the max one.
- pax means persons
- freight: in the context of passenger ferries, I believe it means the vehicles
loaded

## Ecosystem

- [greenferries-www](https://github.com/greenferries/greenferries-www): The
public website that uses the data maintained through this admin
- [greenferries-data](https://github.com/greenferries/greenferries-data):
datasets, APIs and iPython notebooks to explore the different original data
sources that were used to create the GreenFerries database
- [greenferries-scrapers](https://github.com/greenferries/greenferries-scrapers):
Scrapers used to populate data from ferries booking websites

## Resources

- Rails & ActiveAdmin
