import numpy as np
import pandas as pd
import os


BASEPATH = os.path.dirname(__file__)

df_thetis = pd.read_excel(
        os.path.join(BASEPATH, 'thetis_mrv_2019_12_24.xlsx'),
        skiprows=2
    )
df_registre_fr = pd.read_csv(
        os.path.join(BASEPATH, 'registre-navire-pro-13112019.csv'),
    )

corsica_ferries_imos = [
    8306498,
    8306486,
    9365398,
    9035101,
    9086590,
    9208083,
    9203186,
    9203174,
    7305253,
    7205910,
    7360617,
    7349039,
    9135963    
]
df_thetis_corsica_ferries = df_thetis[df_thetis['IMO Number'].isin(corsica_ferries_imos)]

print(df_registre_fr)