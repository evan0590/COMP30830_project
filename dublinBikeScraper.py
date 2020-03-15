import requests,json,datetime,time,pandas as pd
import pymysql

try:
	# connects to database
	host="database-comp30830.c2kwpm1jk01q.us-east-1.rds.amazonaws.com"
	port=3306
	dbname="comp30830_db"
	user="admin"
	password="Simple12"

	conn = pymysql.connect(host, user=user,port=port,passwd=password, db=dbname)
	cursor = conn.cursor()

	#makes call to api
	url= "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f2869ff03482662d9b79020b0a238225305f659f"

	# saves api result as variables parsed 
	response = requests.get(url)
	data = response.text
	parsed = json.loads(data)
	length = len(parsed)

	for x in range(length):
		number = parsed[x]["number"]
		availableBikeStands = parsed[x]["available_bike_stands"]
		availableBikes = parsed[x]["available_bikes"]
		# converts epoch data to date, time , day
		epoch = (parsed[x]["last_update"])/1000
		year = time.strftime("%Y", time.localtime(epoch))
		month = time.strftime("%m", time.localtime(epoch))
		date = time.strftime("%d", time.localtime(epoch))
		dateUpdate = year+"-"+month+"-"+date
		timeUpdate = time.strftime("%H:%M:%S", time.localtime(epoch))
		dayUpdate = time.strftime("%a", time.localtime(epoch))
		status = parsed[x]["status"]
		#pushes data to SQL table on database
		try:
			cursor.execute("INSERT INTO live_bike_data (ID, availableBikeStands,availableBikes,date,time,day,status,epoch) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(number,availableBikeStands,availableBikes,dateUpdate,timeUpdate,dayUpdate,status,epoch))
			conn.commit()
		except:
			pass

	conn.close()

except:
	pass

