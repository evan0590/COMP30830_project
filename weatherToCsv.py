import pandas as pd
from sqlalchemy import create_engine
import os

URI = os.environ.get('DB_HOST')
PORT = 3306
DB = "comp30830_db"
PASSWORD = os.environ.get('DB_PASS')
USER = os.environ.get('DB_USER')

engine = create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(USER, PASSWORD,
                                                               URI, PORT, DB), echo=True)
weather = pd.read_sql_table('weather_bike_data', engine)
weather.to_csv('csvfiles/allWeather.csv', index=False)