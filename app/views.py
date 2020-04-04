from app import application
from flask import render_template
from flask import jsonify
from flask import request
import pandas as pd
import numpy as np
from app.models import static_bike_data
from app.models import live_bike_data
from app.models import staticbike_schema
from app.models import bike_schema
from app.models import live_weather_data
from app.models import weather_schema
from app.models import future_weather_data
from app.models import future_weather_schema
from datetime import date
from sqlalchemy import desc
from sqlalchemy.sql import func
from app import db
import pickle
import datetime as dt

print('in views')


@application.route('/static')
def static_bike_info_json():
    station_info = static_bike_data.query.all()
    result = staticbike_schema.dump(station_info)
    return jsonify(result)


@application.route('/live')
def live_bike_info_json():
    today = str(date.today())
    print(today)
    # Find maximum time value using func.max for each station ID and store in subquery function
    latest_time = db.session.query(db.func.max(live_bike_data.epoch).label('epoch')).group_by(
        live_bike_data.ID).subquery()
    # Join latest_time result with overall query using time as join condition and filter for todays results for each station ID
    bike_info = live_bike_data.query.join(latest_time, live_bike_data.epoch == latest_time.c.epoch).filter(
        live_bike_data.date == today).group_by(live_bike_data.ID).all()
    # Serialize the queryset
    result = bike_schema.dump(bike_info)
    return jsonify(result)


@application.route('/weather')
def weather_json():
    weather = live_weather_data.query.order_by(live_weather_data.date.desc()).order_by(
        desc(live_weather_data.time)).limit(1).all()
    # Serialize the queryset
    result = weather_schema.dump(weather)
    return jsonify(result)


@application.route('/homepage')
def test():
    return render_template('index.html')


@application.route('/linegraphdays', methods=['POST', 'GET'])
def lineGraphDays():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    dayAverageBikes = []
    station = request.json
    for day in days:
        filtereddf = db.session.query(db.func.avg(live_bike_data.availableBikes).label('availableBikes')).filter(
            live_bike_data.ID == station).filter(live_bike_data.day == day).all()
        for row in filtereddf:
            average = float(row[0])
            dayAverageBikes.append(round(average))

    return jsonify(dayAverageBikes)


@application.route('/linegraphhours', methods=['POST', 'GET'])
def lineGraphHours():
    time = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00",
            "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00", "23:59:59"]
    dayAverageBikes = []
    result = request.json
    day = result[0][:3]
    stationID = result[1]
    for x in range(16):
        filtereddf = db.session.query(db.func.avg(live_bike_data.availableBikes).label('availableBikes')).filter(
            live_bike_data.ID == stationID).filter(live_bike_data.day == day).filter(
            live_bike_data.time.between(time[x], time[x + 1])).all()
        for row in filtereddf:
            average = float(row[0])
            dayAverageBikes.append(round(average))

    return jsonify(dayAverageBikes)


@application.route('/futureweather')
def future_weather_json():
    future_weather = future_weather_data.query.order_by(future_weather_data.dateTime.desc())
    result = future_weather_schema.dump(future_weather)
    return jsonify(result)


@application.route('/futureweatherbee')
def future_weather_json_b():
    today = str(date.today())
    date_info = future_weather_data.query.filter(future_weather_data.date == today).all()
    result = future_weather_schema.dump(date_info)
    return jsonify(result)


@application.route("/predict", methods=['POST', 'GET'])
def predict():
    result = request.json
    stationID = result[0]
    day = str(result[1])
    hour = str(result[2])
    weather = future_weather_data.query.filter(future_weather_data.date == day).filter(
        future_weather_data.time == hour).all()
    result = future_weather_schema.dump(weather)
    # creating dataframe for testing here.
    dataframe = pd.DataFrame(result)
    # convert dateTime object column to datetime[ns] data type.
    dataframe.dateTime = pd.to_datetime(dataframe.dateTime)
    # creating columns to match the training input dataset.
    morning_start = pd.to_datetime("05:00:00").time()
    morning_end = pd.to_datetime("12:00:00").time()
    afternoon_start = pd.to_datetime("12:01:00").time()
    afternoon_end = pd.to_datetime("16:59:00").time()
    evening_start = pd.to_datetime("17:00:00").time()
    evening_end = pd.to_datetime("20:00:00").time()
    night_start = pd.to_datetime("20:01:00").time()
    night_end = pd.to_datetime("23:59:59").time()
    dataframe['morning'] = np.where((dataframe['dateTime'].dt.time > morning_start)
                                    & (dataframe['dateTime'].dt.time < morning_end),
                                    1, 0)
    dataframe['afternoon'] = np.where((dataframe['dateTime'].dt.time > afternoon_start)
                                      & (dataframe['dateTime'].dt.time < afternoon_end),
                                      1, 0)
    dataframe['evening'] = np.where((dataframe['dateTime'].dt.time > evening_start)
                                    & (dataframe['dateTime'].dt.time < evening_end),
                                    1, 0)
    dataframe['night'] = np.where((dataframe['dateTime'].dt.time > night_start)
                                  & (dataframe['dateTime'].dt.time < night_end),
                                  1, 0)
    dataframe["tod"] = dataframe.dateTime.dt.hour
    # categorise weather codes
    dataframe["number"].replace([801, 802, 803, 804], 'clouds', inplace=True)
    dataframe["number"].replace([800], 'clear', inplace=True)
    dataframe["number"].replace([701, 711, 721, 731, 741, 751, 761, 762, 771, 781], 'Atmosphere', inplace=True)
    dataframe["number"].replace([600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], 'snow', inplace=True)
    dataframe["number"].replace([500, 501, 502, 503, 504, 511, 520, 521, 522, 531], 'rainfall', inplace=True)
    dataframe["number"].replace([300, 301, 302, 310, 311, 312, 313, 314, 321], 'drizzle', inplace=True)
    dataframe["number"].replace([200, 201, 202, 210, 211, 212, 221, 230, 231, 232], 'thunderstorm', inplace=True)
    # add a flag that indicates whether a day is dry (has zero rain)
    dataframe['dry_day'] = (dataframe['rain'] == 0).astype(int)
    # binary encode weather categories to match input dataset.
    dataframe['number_clear'] = np.where((dataframe['number'] == 'clear'), 1, 0)
    dataframe['number_clouds'] = np.where((dataframe['number'] == 'clouds'), 1, 0)
    dataframe['number_drizzle'] = np.where((dataframe['number'] == 'drizzle'), 1, 0)
    dataframe['number_rainfall'] = np.where((dataframe['number'] == 'rainfall'), 1, 0)
    # binary encode times of the day to match input dataset.
    dataframe['tod_5'] = np.where((dataframe['tod'] == 5), 1, 0)
    dataframe['tod_6'] = np.where((dataframe['tod'] == 6), 1, 0)
    dataframe['tod_7'] = np.where((dataframe['tod'] == 7), 1, 0)
    dataframe['tod_8'] = np.where((dataframe['tod'] == 8), 1, 0)
    dataframe['tod_9'] = np.where((dataframe['tod'] == 9), 1, 0)
    dataframe['tod_10'] = np.where((dataframe['tod'] == 10), 1, 0)
    dataframe['tod_11'] = np.where((dataframe['tod'] == 11), 1, 0)
    dataframe['tod_12'] = np.where((dataframe['tod'] == 12), 1, 0)
    dataframe['tod_13'] = np.where((dataframe['tod'] == 13), 1, 0)
    dataframe['tod_14'] = np.where((dataframe['tod'] == 14), 1, 0)
    dataframe['tod_15'] = np.where((dataframe['tod'] == 15), 1, 0)
    dataframe['tod_16'] = np.where((dataframe['tod'] == 16), 1, 0)
    dataframe['tod_17'] = np.where((dataframe['tod'] == 17), 1, 0)
    dataframe['tod_18'] = np.where((dataframe['tod'] == 18), 1, 0)
    dataframe['tod_19'] = np.where((dataframe['tod'] == 19), 1, 0)
    dataframe['tod_20'] = np.where((dataframe['tod'] == 20), 1, 0)
    dataframe['tod_21'] = np.where((dataframe['tod'] == 21), 1, 0)
    dataframe['tod_22'] = np.where((dataframe['tod'] == 22), 1, 0)
    dataframe['tod_23'] = np.where((dataframe['tod'] == 23), 1, 0)
    # replace days with numbers for generating the results of the different models
    dataframe.day.replace(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [0, 1, 2, 3, 4, 5, 6], inplace=True)
    if dataframe.day[0] == 5 or dataframe.day[0] == 6:
        with open('app/static/models_weekends/' + str(stationID) + '.pkl', 'rb') as handle:
            model = pickle.load(handle)
            # binary encode days to match input dataset
        dataframe.day.replace([0, 1, 2, 3, 4, 5, 6], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              inplace=True)
        dataframe['day_x_Sun'] = np.where((dataframe['day'] == 'Sun'), 1, 0)
        # align columns with those found in the training dataset
        dataframe = dataframe[['temp', 'rain', 'morning', 'afternoon', 'evening', 'night', 'dry_day', 'day_x_Sun',
                               'number_clouds', 'number_drizzle', 'number_rainfall', 'tod_5', 'tod_6', 'tod_7',
                               'tod_8', 'tod_9', 'tod_10', 'tod_11', 'tod_12', 'tod_13', 'tod_14', 'tod_15', 'tod_16',
                               'tod_17', 'tod_18', 'tod_19', 'tod_20', 'tod_21', 'tod_22', 'tod_23']]
        predict = model.predict(dataframe)
        predict = np.around(predict)
        prediction = predict.tolist()
    else:
        with open('app/static/models_weekdays/' + str(stationID) + '.pkl', 'rb') as handle:
            model = pickle.load(handle)
        dataframe.day.replace([0, 1, 2, 3, 4, 5, 6], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], inplace=True)
        dataframe['day_x_Mon'] = np.where((dataframe['day'] == 'Mon'), 1, 0)
        dataframe['day_x_Thu'] = np.where((dataframe['day'] == 'Thu'), 1, 0)
        dataframe['day_x_Tue'] = np.where((dataframe['day'] == 'Tue'), 1, 0)
        dataframe['day_x_Wed'] = np.where((dataframe['day'] == 'Wed'), 1, 0)
        dataframe = dataframe[['temp', 'rain', 'morning', 'afternoon', 'evening', 'night', 'dry_day', 'day_x_Mon',
                               'day_x_Thu', 'day_x_Tue', 'day_x_Wed', 'number_clear',
                               'number_clouds', 'number_drizzle', 'number_rainfall', 'tod_5', 'tod_6', 'tod_7',
                               'tod_8', 'tod_9', 'tod_10', 'tod_11', 'tod_12', 'tod_13', 'tod_14', 'tod_15', 'tod_16',
                               'tod_17', 'tod_18', 'tod_19', 'tod_20', 'tod_21', 'tod_22', 'tod_23']]
        predict = model.predict(dataframe)
        predict = np.around(predict)
        prediction = predict.tolist()
    return jsonify(prediction[0])
