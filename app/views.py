from app import application
from flask import render_template
from flask import jsonify
from app.models import static_bike_data
from app.models import live_bike_data
from app.models import bike_schema
from app.models import live_weather_data
from app.models import weather_schema
from datetime import date
from sqlalchemy import desc


print('in views')

@application.route('/')
def test_json():
    today = str(date.today())
    print(today)
    bikes = live_bike_data.query.filter(live_bike_data.date==today).order_by(desc(live_bike_data.time)).group_by(live_bike_data.ID).all()
    # Serialize the queryset
    result = bike_schema.dump(bikes)
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

@application.route('/bikes')
def get_bikes():
    bikes = static_bike_data.query.all() 
    return render_template('index.html', bikes=bikes)#pass in bikes data and display with index
    
@application.route('/stands')
def get_stands():
    stands = live_bike_data.query.order_by('date').limit(1)
    return render_template('index.html', stands=stands)


