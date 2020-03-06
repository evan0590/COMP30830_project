from flask import jsonify
from app import db


print('in models')

class static_bike_data(db.Model):# to go into models.py file
    bike_stands = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(80), primary_key=True)     
    ID = db.Column(db.Integer, primary_key=True)

    def __init__(self, bike_stands, ID, name):
        self.bike_stands = bike_stands
        self.ID = ID
        self.name=name
        
bikes = static_bike_data.query.all()        

print('in models ran')