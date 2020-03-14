import requests,json,datetime,time
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
	url= "http://api.openweathermap.org/data/2.5/weather?id=7778677&appid=736538126c6af13ebf7ef1b17a259cb4"

	response = requests.get(url)
	data = response.text
	parsed = json.loads(data)

	#weather on openweather mapped formatted using kelvin so convert to degrees
	kelvin = 273.15
	number = parsed["weather"][0]["id"]
	main = parsed["weather"][0]["main"]
	description = parsed["weather"][0]["description"]
	icon =  parsed["weather"][0]["icon"]
	temp =  round(int(parsed["main"]["temp"])-kelvin)
	tempMin =  round(int(parsed["main"]["temp_min"])-kelvin)
	tempMax =  round(int(parsed["main"]["temp_max"])-kelvin)
	tempFeels =  round(int(parsed["main"]["feels_like"])-kelvin)
	pressure =  parsed["main"]["pressure"]	
	humidity =  parsed["main"]["humidity"]
	windSpeed =  parsed["wind"]["speed"]
	windDeg =  parsed["wind"]["deg"]
	try:
		rain = parsed["rain"]["1h"]
	except:
		rain = 0
	epochSunrise = parsed["sys"]["sunrise"]
	sunriseTimeUpdate = time.strftime("%H:%M:%S", time.localtime(epochSunrise))
	epochSunset = parsed["sys"]["sunset"]
	sunsetTimeUpdate = time.strftime("%H:%M:%S", time.localtime(epochSunset))
	epoch = (parsed["dt"])
	year = time.strftime("%Y", time.localtime(epoch))
	month = time.strftime("%m", time.localtime(epoch))
	date = time.strftime("%d", time.localtime(epoch))
	dateUpdate = year+"-"+month+"-"+date
	timeUpdate = time.strftime("%H:%M:%S", time.localtime(epoch))
	dayUpdate = time.strftime("%a", time.localtime(epoch))

	#checks for duplicate row on database and if it is then it skips
	try:
		#pushes data to SQL table on database
		cursor.execute("INSERT INTO live_weather_data (number, main,descripton,icon,temp,tempMin,tempMax,tempFeels,humidity,pressure,windSpeed,windDeg,rain,sunrise,sunset,date,time,day) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(number,main,description,icon,temp,tempMin,tempMax,tempFeels,humidity,pressure,windSpeed,windDeg,rain,sunriseTimeUpdate,sunsetTimeUpdate,dateUpdate,timeUpdate,dayUpdate))
		conn.commit()
	except:
		pass

	conn.close()

except:
	pass