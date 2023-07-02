---
layout: doc
activeDocPageTitle: Monitoring Methods
---

# Monitoring Methods

## Allowed methods

The THETIS regulation allows ships to use different emmission monitoring methods, named A to D.
*If my understanding is correct*, A is the least precise one, and D the most precise one.

{% for letter in ["a", "b", "c", "d"] %}- **{{ letter | capitalize }}**: {{ letter | monitoringMethodLetterToDescription }}
{% endfor %}

In the whole THETIS fleet there are only 2 ships that use the method **D**:

- Mount Kimbo - IMO 9470997, a chemical tanker
- MP MR Tanker 1 - IMO 9472763, another chemical tanker

## Methods used by passenger ferries

This graph represents the distribution of passenger ferries within the GreenFerries scope grouped per monitoring method:

![Monitoring methods distribution](/img/doc_monitoring_methods_distribution.svg)

We can see that unfortunately the most used monitoring method is the least precise one, A.
Also, a non-negligeable number of ships declare that they use multiple monitoring methods, which makes things quite complicated if we want to compare ships.

We have been warned that **it is probably wrong to compare ships that use different monitoring methods** because their result may differ only because of the method used. However, this is exactly what we are doing currently with the EcoScore. We are still looking for a harmonization method to be able to readjust figures depending on the monitoring method used.
