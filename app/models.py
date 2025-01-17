#Models file contains all the models we use to store representations of data from the database. These are stored in a collection of classes, separated by function.
#Import db object from __init__ file to use for creating classes.
#The structure to create our models using the marshmallow library was referenced from https://flask-marshmallow.readthedocs.io/en/latest/

from app import db
from marshmallow import Schema, fields

print('in models')

class static_bike_data(db.Model):
    """Data structure representing static bike data"""
    ID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), primary_key=True)
    Latitude = db.Column(db.Float, primary_key=True)
    Longtitude = db.Column(db.Float, primary_key=True)

    def __init__(self, ID, name, Latitude, Longtitude):
        """Defines properties for representing data in constructor"""
        self.ID = ID
        self.name = name
        self.Latitude = Latitude
        self.Longtitude = Longtitude

class staticSchema(Schema):
    """Schema defines output format for serializing data"""
    ID = fields.Int(dump_only=True)
    name = fields.Str()
    Latitude = fields.Float(dump_only=True)
    Longtitude = fields.Float(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, static_bike_data):
        return "{}, {}".format(static_bike_data.ID, static_bike_data.name)


staticbike_schema = staticSchema(many=True)


class live_bike_data(db.Model):
    """Data structure representing live bike data"""
    ID = db.Column(db.Integer, primary_key=True)
    availableBikeStands = db.Column(db.Integer, primary_key=True)
    availableBikes = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)
    day = db.Column(db.String(80), primary_key=True)
    epoch = db.Column(db.Integer)

    def __init__(self, ID, availableBikeStands, availableBikes, date, time, epoch):
        """Defines properties for representing data in constructor"""
        self.ID = ID
        self.availableBikeStands = availableBikeStands
        self.availableBikes = availableBikes
        self.date = date
        self.time = time
        self.day = day
        self.epoch = epoch


class liveSchema(Schema):
    """Schema defines output format for serializing data"""
    ID = fields.Int(dump_only=True)
    availableBikeStands = fields.Int(dump_only=True)
    availableBikes = fields.Int(dump_only=True)
    date = fields.Date(dump_only=True)
    time = fields.Time(dump_only=True)
    day = fields.Str()
    epoch = fields.Int(dump_only=True)
    formatted_name = fields.Method("format_name", dump_only=True)

    def format_name(self, live_bike_data):
        return "{}, {}".format(live_bike_data.ID, live_bike_data.availableBikeStands,
                               live_bike_data.availableBikes, live_bike_data.date, live_bike_data.time,
                               live_bike_data.day, live_bike_data.epoch)


bike_schema = liveSchema(many=True)


class live_weather_data(db.Model):
    """Data structure representing live weather data"""
    number = db.Column(db.Integer, primary_key=True)
    rain = db.Column(db.Float, primary_key=True)
    day = db.Column(db.String(80), primary_key=True)
    description = db.Column(db.String(80), primary_key=True)
    icon = db.Column(db.String(80), primary_key=True)
    temp = db.Column(db.Float, primary_key=True)
    tempFeels = db.Column(db.Float, primary_key=True)
    windSpeed = db.Column(db.Float, primary_key=True)
    humidity = db.Column(db.Float, primary_key=True)
    pressure = db.Column(db.Float, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)

    def __init__(self, number, rain, day, description, icon, temp, tempFeels, windSpeed,
                 humidity, pressure, date, time):
        """Defines properties for representing data in constructor"""
        self.number = number
        self.rain = rain
        self.day = day
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
    """Schema defines output format for serializing data"""
    number = fields.Int(dump_only=True)
    rain = fields.Float(dump_only=True)
    day = fields.Str()
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
        return "{}, {}".format(live_weather_data.number, live_weather_data.rain, live_weather_data.day,
                               live_weather_data.description, live_weather_data.icon,
                               live_weather_data.temp, live_weather_data.tempFeels, live_weather_data.windSpeed,
                               live_weather_data.humidity, live_weather_data.pressure,
                               live_weather_data.date, live_weather_data.time)


weather_schema = weatherSchema(many=True)


class future_weather_data(db.Model):
    """Data structure representing future weather data"""
    number = db.Column(db.Integer, primary_key=True)
    temp = db.Column(db.Float, primary_key=True)
    rain = db.Column(db.Float, primary_key=True)
    day = db.Column(db.String(80), primary_key=True)
    dateTime = db.Column(db.DateTime(), primary_key=True)
    time = db.Column(db.TIME, primary_key=True)
    date = db.Column(db.DateTime(), primary_key=True)
    tempFeels = db.Column(db.Float, primary_key=True)
    descripton = db.Column(db.String(80), primary_key=True)

    def __init__(self, number, temp, rain, day, dateTime, time, date, tempFeels, descripton):
        """Defines properties for representing data in constructor"""
        self.number = number
        self.temp = temp
        self.rain = rain
        self.day = day
        self.dateTime = dateTime
        self.time = time
        self.date = date
        self.tempFeels = tempFeels
        self.descripton = descripton


class futureWeatherSchema(Schema):
    """Schema defines output format for serializing data"""
    number = fields.Int(dump_only=True)
    temp = fields.Float(dump_only=True)
    rain = fields.Float(dump_only=True)
    day = fields.Str()
    dateTime = fields.DateTime(dump_only=True)
    time = fields.Time(dump_only=True)
    date = fields.Date(dump_only=True)
    tempFeels = fields.Float(dump_only=True)
    descripton = fields.Str()

    def format_name(self, future_weather_data):
        return "{}, {}".format(future_weather_data.number, future_weather_data.temp, future_weather_data.rain,
                               future_weather_data.day, future_weather_data.dateTime, future_weather_data.time,
                               future_weather_data.date, future_weather_data.tempFeels, future_weather_data.descripton)


future_weather_schema = futureWeatherSchema(many=True)

print('in models ran')
