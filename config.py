# Config file was created separately from __init__ file.
# This way allows us to create multiple instances of your application with different configurations attached.
# The implementation of this file was referenced from https://flask.palletsprojects.com/en/1.1.x/config/

class Config(object):
    """Creates default config object"""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI='sqlite:///:memory'

class ProductionConfig(Config):
    """Config used when deploying app on EC2 instance"""
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:Simple12@database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com/comp30830_db'
    use_reloader=False#Disable Werkzeug reloader child process to prevent flask server running twice

class DevelopmentConfig(Config):
    """Config used for developing app"""
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:Simple12@database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com/comp30830_db'
    DEBUG = True

class TestingConfig(Config):
    """Config used for testing app"""
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:Simple12@database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com/comp30830_db'
    TESTING = True
    
print('inconfig')