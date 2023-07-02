---
layout: doc
activeDocPageTitle: Contribute
---

# How to contribute?

If you too are interested in passenger ferries pollution, we would love to have a chat with you, please [say hi from the contact page!](/doc/contact).

If you wish to help, here are a few areas where we think Greenferries could be improved. We welcome new ideas too!

## Fill up missing routes

There are currently **{{ collections.ship | inScope | withoutRoutes | length }} passenger ferries ships with no routes** defined in Greenferries. We believe that for most of these ferries the information should not be too hard to find, just a few queries on Wikipedia or web search engines. This requires no particular knowledge, and the interface to edit a ship's routes can be used by anyone!

Please [head here](/ships_without_routes) to see the list of {{ collections.ship | inScope | withoutRoutes | length }} passenger ferries ships with no routes.

## Help us understand the data

If you have any knowledge of the sea transport industry or are curious to learn, we have many holes in our understanding of the data. Here are a few questions we are still trying to figure out:

- How are the emissions attributions between freight and persons decided?
- Is it okay to compare ships that use different monitoring methods?
- If it is not, how can we harmonize the figures?
- Why can ferries that look very much alike have such different emission scores?

## Dig into the data - for data scientists

If you have some skils with data science, you will find very interesting datasets, already partially cleaned! We believe that some help to understand the previous questions could be reached by digging into the data. It does not necessarily have to be intricate Machine Learning, but some simple analysis could reveal correlation between unsuspected ship characteristics.

- There is a web data platform with an API and exportable CSVs on [data.greenferries.org](https://data.greenferries.org).
- In the [GitHub repository](https://github.com/greenferries/greenferries/tree/master/data/notebooks) you will find Jupyter notebooks where you can play with pandas dataframes already built

## Spread the word

Greenferries is almost invisible on the web, we would love to get feedback and reach more people who are interested in lowering their carbon footprint.

Another way to spread the word is to get in touch with industry players, like ferry operators or THETIS verification companies. We would love to have them come and discover the data, and maybe help discover errors or ways to improve the transparency for passengers.
