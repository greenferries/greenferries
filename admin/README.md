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

## Deploy to Dokku

⚠️ you'll need to have SSH access to the DO droplet where this app is hosted

```
# from the monorepo's root folder
git remote add dokku dokku@dokku-host:greenferries-admin
make deploy_admin

# or with --force
make deploy_admin_force
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

## Resources

- Rails & ActiveAdmin
