NM_TO_KM = 1.852001
CAR_CO2_PER_KM = 193
PLANE_CO2_PER_KM_PAX = 144.6
# cf https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles
THRESHOLDS = [
  round(CAR_CO2_PER_KM / 2),
  round(CAR_CO2_PER_KM),
  round(PLANE_CO2_PER_KM_PAX * 2),
  round(PLANE_CO2_PER_KM_PAX * 4)
]


def get_ecoscore_index(g_co2_per_km_pax):
    for index, threshold in enumerate(THRESHOLDS):
        if g_co2_per_km_pax < threshold:
            return index
    return 4


def get_ecoscore_letter(g_co2_per_km_pax):
    if not g_co2_per_km_pax:
        return None
    return ["A", "B", "C", "D", "E"][get_ecoscore_index(g_co2_per_km_pax)]
