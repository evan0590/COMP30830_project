import pandas as pd
from sqlalchemy import create_engine
import os
import time

try:
    URI = os.environ.get('DB_HOST')
    PORT = 3306
    DB = "comp30830_db"
    PASSWORD = os.environ.get('DB_PASS')
    USER = os.environ.get('DB_USER')

    engine = create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(USER, PASSWORD,
                                                                   URI, PORT, DB), echo=True)
    bikes = pd.read_sql_table('live_bike_data', engine)
    bikes.to_csv('/home/ubuntu/COMP30830_project/csv_files/allBikes.csv', index=False)

except:
    print("Bikes to CSV failed", time.time())
