import os
import re
import pandas as pd
import frontmatter

DIRNAME = os.path.dirname(__file__)
WWW_SHIPS_PATH = os.path.join(DIRNAME, "../../www/views/ships")

def get_frontmatter_df(only_out_of_scope=False, exclude_out_of_scope=True):
    all_ships = []
    for filename in os.listdir(WWW_SHIPS_PATH):
        if not re.match(r".*-(\d+)\.md", filename):
            continue
        ship_frontmatter = frontmatter.load(os.path.join(WWW_SHIPS_PATH, filename))
        all_ships.append({ **ship_frontmatter.metadata })
    df = pd.DataFrame(all_ships)
    if only_out_of_scope:
        df = df[df.outOfScope == True]
    elif exclude_out_of_scope:
        df = df[df.outOfScope != True]
    return df

if __name__ == "__main__":
    print(get_frontmatter_df().head())
