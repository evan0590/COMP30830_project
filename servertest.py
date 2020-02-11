import pandas as pd
import pymysql

host="database-1.ci3puzqaff88.us-east-1.rds.amazonaws.com"
port=3306
dbname="database-1"
user="admin"
password="project2020"

conn = pymysql.connect(host, user=user,port=port,
                           passwd=password, db=dbname)