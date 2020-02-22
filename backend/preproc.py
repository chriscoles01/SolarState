import pandas as pd


def get_rooftops(data_file: str):
    raw_rooftops = pd.read_csv(data_file)
    processed = pd.DataFrame()
    processed["zip"] = raw_rooftops["zip"]
    for tilt in ["15", "28", "41", "54"]:
        azeniths_for_tilt = raw_rooftops.filter(regex=f"area_t{tilt}a*")
        processed[f"t{tilt}"] = azeniths_for_tilt.sum(axis=1)
    return processed


def create_zip_from_coords_getter(zipcodes_file: str):
    zip_coords = pd.read_csv(zipcodes_file, sep=";")
    zip_coords = zip_coords[["Zip", "Latitude", "Longitude"]]
    zip_coords = zip_coords.rename(
        columns={"Zip": "zip", "Latitude": "lat", "Longitude": "long"})

    def zip_from_coords(long, lat):
        min_lat = (zip_coords["lat"] - lat).abs()
        min_long = (zip_coords["long"] - long).abs()
        closest = zip_coords.iloc[(min_lat + min_long).argsort()[0]]
        if closest.shape[0] == 0:
            print(f"WARNING: No zip found for long: {long} and lat: {lat}! "
                  f"Returning 0!")
            return 0
        else:
            return closest.zip

    return zip_from_coords
