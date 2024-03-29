# python3 -m greenferries.wikidata.download_urls

from .wikidata_client import WikidataClient
from greenferries.db import get_connection

class DownloadUrls(object):
    def __init__(self):
        self.wikidata_client = WikidataClient()

    def get_query(self):
        return """
            SELECT ?item ?imo ?wikipediaUrl ?wikipediaLang
            WHERE {
                ?item p:P31/ps:P31/wdt:P279* wd:Q11446;
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                ?item wdt:P458 ?imo.
                OPTIONAL {
                    ?wikipediaUrl schema:about ?item;
                    schema:inLanguage ?wikipediaLang.
                    FILTER(REGEX(STR(?wikipediaUrl), ".wikipedia.org"))
                }
            }
        """

    def run(self):
        df = self.wikidata_client.execute_query(self.get_query())
        df.dropna(inplace=True)
        df.rename_axis("wikidataUrl", inplace=True)
        df.sort_values("wikidataUrl", inplace=True)
        self.db_con = get_connection()
        df.to_sql("wikidata_urls", self.db_con, if_exists="replace", index=True)
        print(f"wrote wikidata_urls table in db with {df.shape[0]} rows")

if __name__ == "__main__":
    DownloadUrls().run()
