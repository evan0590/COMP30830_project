from app import application
from flask import render_template
#from app.models import static_bike_data

print('in views')

@application.route('/')
def hello_world():
    return 'Hello World'

@application.route('/homepage')
def test():
    return render_template('index.html')

@application.route('/bikes')
def get_bikes():
    pass