class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI='sqlite:///:memory'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DATABASE_URI = 'mysql+pymysql://admin:Simple12@database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com/comp30830_db'
    DEBUG = True

class TestingConfig(Config):
    DATABASE_URI = 'mysql+pymysql://admin:Simple12@database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com/comp30830_db'
    TESTING = True
    
print('inconfig')