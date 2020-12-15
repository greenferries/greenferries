from wikidataintegrator import wdi_core, wdi_login
import os
from dotenv import load_dotenv
load_dotenv()

class WikidataClient:
    def __init__(self, username = None, password = None):
        self.username = username or os.getenv("WIKIDATA_USERNAME")
        self.password = password or os.getenv("WIKIDATA_PASSWORD")
        self.logged_in = False

    def login(self):
        if self.logged_in:
            return
        wdi_login.WDLogin(self.username, self.password)
        self.logged_in = True

    def execute_query(self, query):
        self.login()
        return wdi_core.WDItemEngine.execute_sparql_query(query, as_dataframe=True)
