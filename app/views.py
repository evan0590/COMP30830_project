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
from datetime import date
from sqlalchemy import desc
from sqlalchemy.sql import func
from app import db
import pickle

print('in views')

# de-serialize model.pkl file into an object called model using pickle
with open('model.pkl', 'rb') as handle:
    model = pickle.load(handle)
    print(model)


@application.route("/predictor")
def predict(X_test):
    # I'm thinking that it's going to be here where we pass in a data frame
    # that is the same that the model has been trained on.
    result = model.predict(X_test)
    return jsonify(result)


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
