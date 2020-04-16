import pandas as pd
import numpy as np
import time

try:
    bikes = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/allBikes.csv')
    weather = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/allWeather.csv')
    bikes['datetime'] = pd.to_datetime(bikes['date'] + ' ' + bikes['time'])
    weather['datetime'] = pd.to_datetime(weather['date'] + ' ' + weather['time'])
    bikes = bikes.sort_values(by='datetime')
    weather = weather.sort_values(by='datetime')
    full_df = pd.merge_asof(bikes, weather, left_on="datetime", right_on="datetime", direction="nearest")
    full_df = full_df.drop(full_df[(full_df.datetime.dt.hour > 0) & (full_df.datetime.dt.hour < 5)].index)
    morning_start = pd.to_datetime("05:00:00").time()
    morning_end = pd.to_datetime("12:00:00").time()
    afternoon_start = pd.to_datetime("12:01:00").time()
    afternoon_end = pd.to_datetime("16:59:00").time()
    evening_start = pd.to_datetime("17:00:00").time()
    evening_end = pd.to_datetime("20:00:00").time()
    night_start = pd.to_datetime("20:01:00").time()
    night_end = pd.to_datetime("23:59:59").time()
    full_df['morning'] = np.where((full_df['datetime'].dt.time > morning_start)
                                  & (full_df['datetime'].dt.time < morning_end),
                                  1, 0)
    full_df['afternoon'] = np.where((full_df['datetime'].dt.time > afternoon_start)
                                    & (full_df['datetime'].dt.time < afternoon_end),
                                    1, 0)
    full_df['evening'] = np.where((full_df['datetime'].dt.time > evening_start)
                                  & (full_df['datetime'].dt.time < evening_end),
                                  1, 0)
    full_df['night'] = np.where((full_df['datetime'].dt.time > night_start)
                                & (full_df['datetime'].dt.time < night_end),
                                1, 0)
    full_df["day_x"].replace(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [0, 1, 2, 3, 4, 5, 6], inplace=True)
    full_df['tod'] = full_df.datetime.dt.hour
    full_df["number"].replace([801, 802, 803, 804], 'clouds', inplace=True)
    full_df["number"].replace([800], 'clear', inplace=True)
    full_df["number"].replace([701, 711, 721, 731, 741, 751, 761, 762, 771, 781], 'Atmosphere', inplace=True)
    full_df["number"].replace([600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], 'snow', inplace=True)
    full_df["number"].replace([500, 501, 502, 503, 504, 511, 520, 521, 522, 531], 'rainfall', inplace=True)
    full_df["number"].replace([300, 301, 302, 310, 311, 312, 313, 314, 321], 'drizzle', inplace=True)
    full_df["number"].replace([200, 201, 202, 210, 211, 212, 221, 230, 231, 232], 'thunderstorm', inplace=True)
    full_df.drop(["date_x", "time_x", "status", "epoch", "main",
                  "description", "icon", "tempMin", "tempMax", "tempFeels", "humidity",
                  "pressure", "windSpeed", "windDeg", "sunrise", "sunset",
                  "date_y", "time_y", "day_y"], axis=1, inplace=True)
    full_df = full_df.rename(columns={"availableBikes": "target"})
    full_df.to_csv('/home/ubuntu/COMP30830_project/csv_files/modellingTable.csv', index=False)

except:
    print("Model CSV failed.", time.time())
