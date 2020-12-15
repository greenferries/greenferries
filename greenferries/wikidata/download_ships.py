from .wikidata_client import WikidataClient
from functools import reduce
import pandas as pd

class DownloadShips:
    WHERE_BASE = """
        ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        ?item wdt:P458 ?imo.
    """

    def __init__(self, output_path):
        self.output_path = output_path
        self.wikidata_client = WikidataClient()

    def build_query(self, query_parts):
        return f"""
            SELECT
                ?item
                {query_parts['select']}
            WHERE {{
                {DownloadShips.WHERE_BASE}
                OPTIONAL {{ {query_parts['where']} }}
            }}
        """

    def uniqify_df(self, df):
        df_grouped = df.dropna().groupby('item').agg(list).apply(lambda f: [list(set(ff)) for ff in f])
        for col in df_grouped.columns:
            df_multiple_values = df_grouped[df_grouped[col].map(len) > 1]
            count_multiple = df_multiple_values.count()[0]
            percentage_multiple = round(float(count_multiple) * 100 / df_grouped.count()[0])
            # print(f"found {count_multiple} ships with multiple {col}s")
            # print(f"== {percentage_multiple}%")
            # print(df_multiple_values.head(5))
            # print("---\n")
        if percentage_multiple < 5:
            return df.dropna().groupby('item').first()
        else:
            return df_grouped.apply(lambda f: [", ".join([str(fff) for fff in ff]) for ff in f])

    def get_queries(self):
        queries_parts = [
            {"select": "?mmsi", "where": "?item wdt:P587 ?mmsi." },
            {"select": "?shipTypeLabel", "where": "?item wdt:P31 ?shipType." },
            {"select": "?countryCode", "where": "?item wdt:P17 ?country. \n ?country wdt:P297 ?countryCode." },
            {"select": "?imageLabel", "where": "?item wdt:P18 ?image." },
            {"select": "?beam", "where": "?item wdt:P2261 ?beam." },
            {"select": "?draft", "where": "?item wdt:P2262 ?draft." },
            {"select": "?maximumCapacity", "where": "?item wdt:P1083 ?maximumCapacity." },
            {"select": "?length", "where": "?item wdt:P2043 ?length." },
            {"select": "?width", "where": "?item wdt:P2049 ?width."},
            {"select": "?grossTonnage", "where": "?item wdt:P1093 ?grossTonnage." },
            {
                "select": "?homeportLabel ?homeportCountryCode ?homeportGeonamesId",
                "where": """
                    ?item wdt:P504 ?homeport.
                    ?homeport wdt:P17 ?homeportCountry.
                    ?homeportCountry wdt:P297 ?homeportCountryCode.
                    ?homeport wdt:P1566 ?homeportGeonamesId.
                """
            },
            {
                "select": "?ownerLabel ?ownerUrl ?ownerCountryCode",
                "where": """
                    ?item wdt:P127 ?owner.
                    ?owner wdt:P856 ?ownerUrl.
                    ?owner wdt:P17 ?ownerCountry.
                    ?ownerCountry wdt:P297 ?ownerCountryCode.
                """
            },
            {
                "select": "?operatorLabel ?operatorUrl ?operatorCountryCode",
                "where": """
                    ?item wdt:P137 ?operator.
                    ?operator wdt:P856 ?operatorUrl.
                    ?operator wdt:P17 ?operatorCountry.
                    ?operatorCountry wdt:P297 ?operatorCountryCode.
                """
            },
            {
                "select": "?manufacturerLabel ?manufacturerUrl ?manufacturerCountryCode",
                "where": """
                    ?item wdt:P176 ?manufacturer.
                    ?manufacturer wdt:P856 ?manufacturerUrl.
                    ?manufacturer wdt:P17 ?manufacturerCountry.
                    ?manufacturerCountry wdt:P297 ?manufacturerCountryCode.
                """
            }
        ]
        queries = [self.build_query(qp) for qp in queries_parts]
        queries.insert(0, f"SELECT ?item ?imo WHERE {{ {DownloadShips.WHERE_BASE} }}")
        return queries

    def run(self):
        dfs = [self.wikidata_client.execute_query(q) for q in self.get_queries()]
        dfs_unique = [self.uniqify_df(df) for df in dfs]
        df = reduce(lambda left,right: left.join(right), dfs_unique)
        df.rename_axis("wikidataUrl", inplace=True)
        df.rename(columns = {
            'itemLabel': 'name',
            'shipTypeLabel': 'shipTypes',
            'imageLabel': 'imageUrl',
            'ownerLabel': 'ownerName',
            'operatorLabel': 'operatorName',
            'manufacturerLabel': 'manufacturerName',
            'homeportLabel': 'homeportName'
        }, inplace=True)
        df.to_csv(self.output_path)
        print(f"rewrote {self.output_path}")


if __name__ == "__main__":
    DownloadShips("/tmp/wikidata.ships.csv").run()


# query = """
# SELECT ?item ?wikipediaUrl ?wikipediaLang
# WHERE {
#   ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
#   SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
#   OPTIONAL {
#     ?wikipediaUrl schema:about ?item;
#       schema:inLanguage ?wikipediaLang.
#     FILTER(REGEX(STR(?wikipediaUrl), ".wikipedia.org"))
#   }
# }
# """
