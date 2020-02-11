import requests,json,datetime,time

start = datetime.datetime.strptime('05:00','%H:%M').time()    
end = datetime.datetime.strptime('00:36','%H:%M').time()    
morning = datetime.datetime.strptime('04','%H').time()    

while True:
    now = datetime.datetime.now().time()
    if now.hour >= start.hour or (now.hour == end.hour and now.minute <= end.minute): 

        url= "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f2869ff03482662d9b79020b0a238225305f659f"

        response = requests.get(url)
        data = response.text
        parsed = json.loads(data)
        length = len(parsed)
        
        data = []
        for x in range(length):
            number = parsed[x]["number"]
            availableBikeStands = parsed[x]["available_bike_stands"]
            availableBikes = parsed[x]["available_bikes"]
            epoch = (parsed[x]["last_update"])/1000
            lastUpdate = time.strftime("%a, %d %b %Y %H:%M:%S", time.localtime(epoch))
            data.append({"number":number,"available_bike_stands":availableBikeStands,"available_bikes":availableBikes,"last_update":lastUpdate})

        with open('data.json', 'a') as json_file:
            json.dump(data, json_file,indent=4)

        time.sleep(300)

    elif now.hour == morning.hour:
        time.sleep(60)
    else:
        time.sleep(15000)
