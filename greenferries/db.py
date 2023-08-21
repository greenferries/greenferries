import os, sqlite3

def get_connection(db_name="all_ships"):
    return sqlite3.connect(os.path.join(os.path.dirname(__file__), "..", f"dbs/{db_name}.db"))

