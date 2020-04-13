import requests, json, datetime, time, pandas as pd
import pymysql
import os

try:
    # connects to database
    host = os.environ.get('DB_HOST')
    port = 3306
    dbname = "comp30830_db"
    user = os.environ.get('DB_USER')
    password = os.environ.get('DB_PASS')

    conn = pymysql.connect(host, user=user, port=port, passwd=password, db=dbname)
    cursor = conn.cursor()

    # makes call to api
    APIKEY = os.environ.get('BIKE_API')
    NAME = "dublin"
    WEATHER_URI = "https://api.jcdecaux.com/vls/v1/stations"
    response = requests.get(WEATHER_URI, params={"apiKey": APIKEY, "contract": NAME})

    # saves api result as variables parsed
    response = requests.get(url)
    data = response.text
    parsed = json.loads(data)
    length = len(parsed)

    for x in range(length):
        number = parsed[x]["number"]
        availableBikeStands = parsed[x]["available_bike_stands"]
        availableBikes = parsed[x]["available_bikes"]
        # converts epoch data to date, time , day
        epoch = (parsed[x]["last_update"]) / 1000
        year = time.strftime("%Y", time.localtime(epoch))
        month = time.strftime("%m", time.localtime(epoch))
        date = time.strftime("%d", time.localtime(epoch))
        dateUpdate = year + "-" + month + "-" + date
        timeUpdate = time.strftime("%H:%M:%S", time.localtime(epoch))
        dayUpdate = time.strftime("%a", time.localtime(epoch))
        status = parsed[x]["status"]
        # pushes data to SQL table on database
        try:
            cursor.execute(
                "INSERT INTO live_bike_data (ID, availableBikeStands,availableBikes,date,time,day,status,epoch) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                (number, availableBikeStands, availableBikes, dateUpdate, timeUpdate, dayUpdate, status, epoch))
            conn.commit()
        except:
            pass

    conn.close()

except:
    pass
