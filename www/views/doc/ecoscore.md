---
layout: doc
activeDocPageTitle: EcoScore
---

# EcoScore

## What does this score mean?

![GreenFerries Score B](/img/score_b_150.png)

These grades are completely unofficial and subject to change. Here is
the arbitrary non-linear scale I unilaterally:

score | average g·CO₂/km/person | interpretation
-- | -- | --
**A** | < {{ ecoscoreInfo.gCo2PerKmPaxThresholds[0] }} | {{ "A" | ecoscoreLetterToHint }}
**B** | {{ ecoscoreInfo.gCo2PerKmPaxThresholds[0] }}-{{ ecoscoreInfo.gCo2PerKmPaxThresholds[1] }} | {{ "B" | ecoscoreLetterToHint }}
**C** | {{ ecoscoreInfo.gCo2PerKmPaxThresholds[1] }}-{{ ecoscoreInfo.gCo2PerKmPaxThresholds[2] }} | {{ "C" | ecoscoreLetterToHint }}
**D** | {{ ecoscoreInfo.gCo2PerKmPaxThresholds[2] }}-{{ ecoscoreInfo.gCo2PerKmPaxThresholds[3] }} | {{ "D" | ecoscoreLetterToHint }}
**E** | > {{ ecoscoreInfo.gCo2PerKmPaxThresholds[3] }} | {{ "E" | ecoscoreLetterToHint }}

These bounds have been chosen to match with averages for other transport modes,
as computed by the [ADEME](https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles).

## Ecoscore Distribution

![Ecoscore ships distribution](/img/doc_ships_ecoscore_distribution.svg)

## Distribution before grouping into ecoscore

![Ships average g·CO₂/km/person distribution](/img/doc_ships_emissions_distribution.svg)

## Source code

You can play with [this notebook](https://github.com/greenferries/greenferries/blob/master/data/notebooks/ecoscore_exploration.ipynb) to try and tweak values to find a better definition of this score.

Please [reach out](mailto:contact@greenferries.org) if you think we can do
better.
