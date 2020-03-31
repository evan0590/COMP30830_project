import pickle
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

from sklearn import linear_model
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import cross_validate
from sklearn.model_selection import cross_val_score
from sklearn.utils import resample
from sklearn.model_selection import KFold

import sqlalchemy as sqla
import pymysql
from sqlalchemy import create_engine

import csv
import datetime as dt

URI = 'database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com'
PORT = '3306'
DB = 'comp30830_db'
PASSWORD = 'Simple12'
USER = 'admin'

engine = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD,
                                                               URI, PORT, DB), echo=True)
# read in the tables
bikes = pd.read_sql_table('live_bike_data', engine)
weather = pd.read_sql_table('live_weather_data', engine)
# Make a new dataframe of these tables
# This step is necessary for joining the tables. As they are,
# Python throws a TypeError when attempting the code at lines 44-45.
bikes.to_csv('allBikes.csv', index=False)
weather.to_csv('allWeather.csv', index=False)
# Read csv files into dataframes.
bikes = pd.read_csv('allBikes.csv')
weather = pd.read_csv('allWeather.csv')
# create common datatype for merging.
bikes['datetime'] = pd.to_datetime(bikes['date'] + ' ' + bikes['time'])
weather['datetime'] = pd.to_datetime(weather['date'] + ' ' + weather['time'])
bikes = bikes.sort_values(by='datetime')
weather = weather.sort_values(by='datetime')
# merge the dataframes
full_df = pd.merge_asof(bikes, weather, left_on="datetime", right_on="datetime", direction="nearest")
# constrict the dataframe to only those times in which the service is available to users.
full_df = full_df.drop(full_df[(full_df.datetime.dt.hour > 0) & (full_df.datetime.dt.hour < 5)].index)
## Create four flags each representing the stage of the day.
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
# replace days with numbers
full_df["day_x"].replace(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [0, 1, 2, 3, 4, 5, 6], inplace=True)
# create a time of day column, based on the hours of the day.
full_df['tod'] = full_df.datetime.dt.hour
# categorise the weather data
full_df["number"].replace([801, 802, 803, 804], 'clouds', inplace=True)
full_df["number"].replace([800], 'clear', inplace=True)
full_df["number"].replace([701, 711, 721, 731, 741, 751, 761, 762, 771, 781], 'Atmosphere', inplace=True)
full_df["number"].replace([600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], 'snow', inplace=True)
full_df["number"].replace([500, 501, 502, 503, 504, 511, 520, 521, 522, 531], 'rainfall', inplace=True)
full_df["number"].replace([300, 301, 302, 310, 311, 312, 313, 314, 321], 'drizzle', inplace=True)
full_df["number"].replace([200, 201, 202, 210, 211, 212, 221, 230, 231, 232], 'thunderstorm', inplace=True)
# drop columns that are not needed
full_df.drop(["date_x", "time_x", "status", "epoch", "main",
              "description", "icon", "tempMin", "tempMax", "tempFeels", "humidity",
              "pressure", "windSpeed", "windDeg", "sunrise", "sunset",
              "date_y", "time_y", "day_y"], axis=1, inplace=True)
# rename availableBikes to target.
full_df = full_df.rename(columns={"availableBikes": "target"})

# create two separate dataframes for weekday function and weekend function
week_df = full_df.loc[(full_df['day_x'] >= 0) & (full_df['day_x'] <= 4)]
weekend_df = full_df.loc[(full_df['day_x'] >= 5) & (full_df['day_x'] <= 6)]

# try splitting the dataset here, save X_test as a csv file, read it in on the views side.

# print(week_df.head(5))
def serialiseModelWeekday(stationId):
    weekly_df = week_df.loc[(week_df.ID == stationId)]
    # save a new csv file into dataframe.
    weekly_df.to_csv('weeklyAvailableBikes.csv', index=False)
    # Read csv files into dataframes.
    df = pd.read_csv('weeklyAvailableBikes.csv')
    ## Dropping all columns not necessary for predictive model.
    df.drop(["ID", "datetime"], axis=1, inplace=True)
    # replace days with numbers
    df["day_x"].replace([0, 1, 2, 3, 4, 5, 6], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], inplace=True)
    # We can also do this directly for all categorical features
    df = pd.get_dummies(df, drop_first=True)
    # Input features must exclude the target feature
    column_names = list(df.columns)[1:]
    X = df[column_names]
    y = df.target
    # drop_first = True removes multi-collinearity
    add_var = pd.get_dummies(X['tod'], prefix='tod', drop_first=True)
    # Add all the columns to the model data
    X = X.join(add_var)
    # Drop the original column that was expanded
    X.drop(columns=['tod'], inplace=True)
    # Drop any rows with null values
    df.dropna(axis=0, how='any', inplace=True)
    model = LinearRegression(fit_intercept=False)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
    X_test.to_csv('app/testSet.csv', index=False)
    model.fit(X_train, y_train)

    # Serialize model object into a file called model.pkl on disk using pickle
    with open('app/model.pkl', 'wb') as handle:
        pickle.dump(model, handle, pickle.HIGHEST_PROTOCOL)
    # pickle.HIGHEST_PROTOCOL using the highest available protocol
    # (we used wb to open file as binary and use a higher pickling protocol)


serialiseModelWeekday(42)
