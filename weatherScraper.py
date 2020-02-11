import requests,json,datetime,time

start = datetime.datetime.strptime('05:00','%H:%M').time()    
end = datetime.datetime.strptime('00:36','%H:%M').time()    
morning = datetime.datetime.strptime('04','%H').time()    

while True:
    now = datetime.datetime.now().time()
    if now.hour >= start.hour or (now.hour == end.hour and now.minute <= end.minute): 

        url= "http://api.openweathermap.org/data/2.5/weather?id=7778677&appid=736538126c6af13ebf7ef1b17a259cb4"

        response = requests.get(url)
        data = response.text
        parsed = json.loads(data)
        
        with open('weather.json', 'a') as json_file:
            json.dump(data, json_file,indent=4)

        time.sleep(600)
        
    elif now.hour == morning.hour:
        time.sleep(60)
    else:
        time.sleep(15000)
