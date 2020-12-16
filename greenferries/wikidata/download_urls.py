from .wikidata_client import WikidataClient

# python3 scripts/download_wikidata_urls_file.py

class DownloadUrls(object):
    def __init__(self, output_path):
        self.output_path = output_path
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
        df.to_csv(self.output_path)
        print(f"wrote Wikidata URLs to {self.output_path} √")

if __name__ == "__main__":
    DownloadUrls("/tmp/wikidata.urls.csv").run()
