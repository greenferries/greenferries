---
layout: doc
activeDocPageTitle: Technical Efficiency
---

# Theoretical Technical Efficiency Indexes

## EIV and EEDI

Two different measures characterize the technical efficiency of ships.
They are both measured in gCO₂/ton/nautical mile.
They are theoretical measures: they really on applying formulas based on the characteristics of a ship, not on experimental measures.

- EIV: Efficiency Indicator Values
- EEDI: Energy Efficiency Design Index

Ships are invited to report a technical efficiency using one of these two indexes.

In the GreenFerries scope of passenger ferries:

- {{ shipsWithEivCount }} ships have declared EIV values
- only {{ shipsWithEediCount }} ships have reported using EEDI values
- {{ shipsWithoutTechnicalEfficiencyCount }} ships have not reported any of the two

## Correlation between EIV and EcoScore

We tried looking for correlation between the theoretical technical efficiency and the EcoScore.
The EcoScore is defined based on the reported annual average gCO₂/km/person.
Considering the vast majority of ferries are reporting with the EIV value, we have chosen to ignore the EEDI values.

Here is a scatter plot of the EIV and this average gCO₂/km/person:

![Scatter plot EIV per average emissions reported per distance per person](/img/doc_technical_efficiency_correlation.svg)

*both axes are truncated to ignore outliers*

Conclusion from observation: **there does not seem to be any meaningful correlation between the two values**.
