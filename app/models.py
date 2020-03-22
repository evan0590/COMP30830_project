from flask import jsonify
from app import db
from marshmallow import Schema, fields

print('in models')


class static_bike_data(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), primary_key=True)
    Latitude = db.Column(db.Float, primary_key=True)
    Longtitude = db.Column(db.Float, primary_key=True)

    def __init__(self, ID, name, Latitude, Longtitude):
        self.ID = ID
        self.name = name
        self.Latitude = Latitude
        self.Longtitude = Longtitude


# Define output format with marshmallow.

class staticSchema(Schema):
    ID = fields.Int(dump_only=True)
    name = fields.Str()
    Latitude = fields.Float(dump_only=True)
    Longtitude = fields.Float(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, static_bike_data):
        return "{}, {}".format(static_bike_data.ID, static_bike_data.name)


staticbike_schema = staticSchema(many=True)


class live_bike_data(db.Model):# to go into models.py file
    ID = db.Column(db.Integer, primary_key=True)
    availableBikeStands = db.Column(db.Integer, primary_key=True)
    availableBikes=db.Column(db.Integer, primary_key=True)
    date=db.Column(db.DateTime(), primary_key=True)
    time=db.Column(db.TIME, primary_key=True)
    epoch=db.Column(db.Integer)

    def __init__(self, ID, availableBikeStands, availableBikes, date, time, epoch):
        self.ID = ID
        self.availableBikeStands = availableBikeStands
        self.availableBikes=availableBikes
        self.date=date
        self.time=time
        self.epoch=epoch

class liveSchema(Schema):
    ID = fields.Int(dump_only=True)
    availableBikeStands = fields.Int(dump_only=True)
    availableBikes = fields.Int(dump_only=True)
    date = fields.Date(dump_only=True)
    time=fields.Time(dump_only=True)
    epoch=fields.Int(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, live_bike_data):
        return "{}, {}".format(live_bike_data.ID, live_bike_data.availableBikeStands,
         live_bike_data.availableBikes, live_bike_data.date,live_bike_data.time,live_bike_data.epoch )


bike_schema = liveSchema(many=True)


class live_weather_data(db.Model):
    description = db.Column(db.String(80), primary_key=True)
    icon = db.Column(db.String(80), primary_key=True)
    temp = db.Column(db.Float, primary_key=True)
    tempFeels = db.Column(db.Float, primary_key=True)
    windSpeed = db.Column(db.Float, primary_key=True)
    humidity = db.Column(db.Float, primary_key=True)
    pressure = db.Column(db.Float, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)

    def __init__(self, description, icon, temp, tempFeels, windSpeed,
                 humidity, pressure, date, time):
        self.description = description
        self.icon = icon
        self.temp = temp
        self.tempFeels = tempFeels
        self.windSpeed = windSpeed
        self.humidity = humidity
        self.pressure = pressure
        self.date = date
        self.time = time


class weatherSchema(Schema):
    description = fields.Str()
    icon = fields.Str()
    temp = fields.Float(dump_only=True)
    tempFeels = fields.Float(dump_only=True)
    windSpeed = fields.Float(dump_only=True)
    humidity = fields.Float(dump_only=True)
    pressure = fields.Float(dump_only=True)
    date = fields.Date(dump_only=True)
    time = fields.Time(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, live_weather_data):
        return "{}, {}".format(live_weather_data.description, live_weather_data.icon,
                               live_weather_data.temp, live_weather_data.tempFeels, live_weather_data.windSpeed,
                               live_weather_data.humidity, live_weather_data.pressure,
                               live_weather_data.date, live_weather_data.time)


weather_schema = weatherSchema(many=True)

print('in models ran')
