from flask import jsonify
from app import db
from marshmallow import Schema, fields

print('in models')


class static_bike_data(db.Model):  # to go into models.py file
    bike_stands = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), primary_key=True)
    ID = db.Column(db.Integer, primary_key=True)

    def __init__(self, bike_stands, ID, name):
        self.bike_stands = bike_stands
        self.ID = ID
        self.name = name

    # Define your output format with marshmallow.


class bikeSchema(Schema):
    ID = fields.Int(dump_only=True)
    name = fields.Str()
    bike_stands = fields.Int(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, static_bike_data):
        return "{}, {}".format(static_bike_data.ID, static_bike_data.name)


class live_bike_data(db.Model):  # to go into models.py file
    ID = db.Column(db.Integer, primary_key=True)
    availableBikeStands = db.Column(db.Integer, primary_key=True)
    availableBikes = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)

    def __init__(self, ID, availableBikeStands, availableBikes, date, time):
        self.ID = ID
        self.availableBikeStands = availableBikeStands
        self.availableBikes = availableBikes
        self.date = date
        self.time = time


class staticSchema(Schema):
    ID = fields.Int(dump_only=True)
    availableBikeStands = fields.Int(dump_only=True)
    availableBikes = fields.Int(dump_only=True)
    date = fields.Date(dump_only=True)
    time = fields.Time(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, live_bike_data):
        return "{}, {}".format(live_bike_data.ID, live_bike_data.availableBikeStands, live_bike_data.availableBikes,
                               live_bike_data.date, live_bike_data.time)


bike_schema = staticSchema(many=True)


class live_weather_data(db.Model):
    description = db.Column(db.String(80), primary_key=True)
    icon = db.Column(db.String(80), primary_key=True)
    temp = db.Column(db.Float, primary_key=True)
    tempMin = db.Column(db.Float, primary_key=True)
    tempMax = db.Column(db.Float, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)

    def __init__(self, description, icon, temp, tempMin, tempMax, date, time):
        self.description = description
        self.icon = icon
        self.temp = temp
        self.tempMin = tempMin
        self.tempMax = tempMax
        self.date = date
        self.time = time


class weatherSchema(Schema):
    description = fields.Str()
    icon = fields.Str()
    temp = fields.Float(dump_only=True)
    tempMin = fields.Float(dump_only=True)
    tempMax = fields.Float(dump_only=True)
    date = fields.Date(dump_only=True)
    time = fields.Time(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, live_weather_data):
        return "{}, {}".format(live_weather_data.description, live_weather_data.icon,
                               live_weather_data.temp, live_weather_data.tempMin, live_weather_data.tempMax,
                               live_weather_data.date, live_weather_data.time)


weather_schema = weatherSchema(many=True)

print('in models ran')