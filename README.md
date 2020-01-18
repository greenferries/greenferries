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
