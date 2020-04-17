# Flask application object is created in the __init__.py file.
# The views and models files then import the application and the __name__ variable will resolve to the correct package.
# All #the view functions are required to be imported in the __init__.py file.

from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
import pymysql

print('in init')

#Create application object
application = Flask(__name__)

#Retrieve secret key used for app from environmental variable
application.secret_key = os.getenv('SECRET_KEY')
application.api_key = os.getenv('GOOGLEAPIKEY')

#Set configuration for application from config.py file

application.config.from_object('config.ProductionConfig')
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(application)

#Running order of app requires we import below model here
from app.models import static_bike_data

print('in init ran')

print(f'ENV is set to: {application.config["ENV"]}')

#Running order of app requires we import views file here
from app import views