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
from app import db


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
    weather = live_weather_data.query.order_by(live_weather_data.date.desc()).order_by(desc(live_weather_data.time)).limit(1).all()
    # Serialize the queryset
    result = weather_schema.dump(weather)
    return jsonify(result)


@application.route('/homepage')
def test():
    return render_template('index.html')

@application.route('/machinelearning', methods=['POST','GET'])
def machineLearning():
	station = request.json
	filtereddf = live_bike_data.query.filter(live_bike_data.ID == station).limit(5).all() 
	result = bike_schema.dump(filtereddf)

	df = pd.DataFrame(result)

	return df.to_json()