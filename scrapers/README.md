# GreenFerries Scrapers

*Improve passenger ships environmental impact transparency*

This repository regroups scrapers used to populate the [GreenFerries](https://www.greenferries.org) project database.

## directferries scrapers

a [directferries.fr/](http://directferries.fr/) scraper based on puppeteer.

- `getAllRoutes.js` fetches all ship routes from [ferries.fr](https://www.ferries.fr/)
- `index.js` iterates over the routes and fills up a MongoDB collection with
the ships infos found on directferries
