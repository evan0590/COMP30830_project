#the #Flask application object creation has to be in the __init__.py file. 
#That way each module can import it safely and the __name__ variable will resolve to the correct package.

#All #the view functions (the ones with a route() decorator on top) have to be imported in the __init__.py file. 
#Not the object itself, but the module it is in. Import the view module after the application object is created.

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
print('in init')

application = Flask(__name__)

application.config.from_object('config.DevelopmentConfig')
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(application)

from app.models import static_bike_data

print('in init ran')


print(f'ENV is set to: {application.config["ENV"]}')

from app import views

