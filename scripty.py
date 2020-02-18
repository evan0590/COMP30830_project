#!/usr/bin/python
import pandas as pd
import pymysql.cursors

connection = pymysql.connect(host='database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com',    # your host, usually localhost
                     user='admin',         # your username
                     password='Simple12',  # your password
		     port=3306,
		     database='comp30830_db')        # name of the data base
try:
    with connection.cursor() as cursor:
        # Create a new record
        sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, ('webmaster@python.org', 'not-very-secret'))
	cursor.execute(sql, ('joebloggs@ucd.ie', 'my-new-password'))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()

    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
	cursor.execute(sql, ('joebloggs@ucd.ie',))
        result = cursor.fetchone()
        print(result)
finally:
    connection.close()
