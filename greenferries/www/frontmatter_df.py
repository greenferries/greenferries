import os, re
import pandas as pd
import frontmatter

PACKAGE_ROOT = os.path.join(os.path.dirname(__file__), "..")
WWW_SHIPS_PATH = os.path.join(PACKAGE_ROOT, "..", "www", "views", "ships")


def get_df(only_out_of_scope=False, only_in_scope=False):
    all_ships = []
    for filename in os.listdir(WWW_SHIPS_PATH):
        match_data = re.match(r".*-(\d+)\.md", filename)
        if not match_data:
            continue
        ship_frontmatter = frontmatter.load(os.path.join(WWW_SHIPS_PATH, filename))
        ship_frontmatter.metadata["imo"] = str(ship_frontmatter.metadata["imo"])
        all_ships.append({ **ship_frontmatter.metadata })
    df = pd.DataFrame(all_ships)
    if only_out_of_scope:
        df = df[df.outOfScope == True]
    elif only_in_scope:
        df = df[df.outOfScope != True]
    return df

if __name__ == "__main__":
    df = get_df()
