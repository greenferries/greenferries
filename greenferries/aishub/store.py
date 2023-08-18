# python3 -m greenferries.aishub.store /tmp/aishub.json

import sqlite3, os, sys, json

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data_files", "aishub.db")

def create_tables(cur):
    cur.execute(
        """
            CREATE TABLE IF NOT EXISTS ships (
                imo STRING PRIMARY KEY,
                mmsi STRING,
                name STRING,
                callsign STRING,
                ship_type INTEGER,
                device_type INTEGER,
                dimension_to_bow INTEGER,
                dimension_to_stern INTEGER,
                dimension_to_port INTEGER,
                dimension_to_starboard INTEGER,
                draught FLOAT
            );
        """
    )

    cur.execute(
        """
            CREATE TABLE IF NOT EXISTS trackpoints (
                imo STRING,
                time TIMESTAMP,
                position_accuracy INTEGER,
                rate_of_turn INTEGER,
                longitude FLOAT,
                latitude FLOAT,
                cog FLOAT,
                sog FLOAT,
                heading INTEGER,
                navigational_status INTEGER,
                destination STRING,
                eta STRING,
                PRIMARY KEY (imo, time)
            );
        """
    )

def read_trackpoints(json_filepath):
    data = json.load(open(json_filepath))
    metadata, raw_points = data
    if metadata["ERROR"]:
        print(f"cannot process file, response contains an error : {metadata['ERROR']}")
        sys.exit(1)

    if metadata["FORMAT"] != "HUMAN":
        print(f"cannot process file, response format is not HUMAN but : {metadata['FORMAT']}")
        sys.exit(1)

    return [
        {
            "mmsi": str(r["MMSI"]),
            "time": r["TIME"],
            "longitude": r["LONGITUDE"],
            "latitude": r["LATITUDE"],
            "cog": r["COG"],
            "sog": r["SOG"],
            "heading": r["HEADING"],
            "position_accuracy": r.get("PAC"),
            "rate_of_turn": r.get("ROT"),
            "navigational_status": r["NAVSTAT"],
            "imo": str(r["IMO"]),
            "name": r["NAME"],
            "callsign": r["CALLSIGN"],
            "ship_type": r["TYPE"],
            "device_type": r.get("DEVICE"),
            "dimension_to_bow": r["A"],
            "dimension_to_stern": r["B"],
            "dimension_to_port": r["C"],
            "dimension_to_starboard": r["D"],
            "draught": r["DRAUGHT"],
            "destination": r["DEST"],
            "eta": r["ETA"]
        }
        for r in raw_points
    ]

def store(json_filepath):
    open(DB_PATH, "a").close()
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    create_tables(cur)

    trackpoints = read_trackpoints(json_filepath)
    for trackpoint in trackpoints:
        ship_fields = [
            "imo", "mmsi", "name", "callsign", "ship_type", "device_type", "dimension_to_bow",
            "dimension_to_stern", "dimension_to_port", "dimension_to_starboard", "draught"
        ]
        cur.execute(
            f"""
                INSERT OR REPLACE INTO ships (
                    {", ".join(ship_fields)}
                ) VALUES (
                    {", ".join([f":{f}" for f in ship_fields])}
                );
            """,
            trackpoint
        )
        con.commit()
        print(f"upserted ship {trackpoint['imo']}")

        trackpoint_fields = [
            "imo", "time", "position_accuracy", "rate_of_turn", "longitude", "latitude", "cog",
            "sog", "heading", "navigational_status", "destination", "eta"
        ]
        cur.execute(
            f"""
                INSERT OR REPLACE INTO trackpoints (
                    {", ".join(trackpoint_fields)}
                ) VALUES (
                    {", ".join([f":{f}" for f in trackpoint_fields])}
                );
            """,
            trackpoint
        )
        con.commit()
        print(f"upserted trackpoint {trackpoint['imo']} {trackpoint['time']}")

    print(f"finished upserting {len(trackpoints)} trackpoints into {DB_PATH}")
    con.close()

if __name__ == "__main__":
    store(sys.argv[1])
