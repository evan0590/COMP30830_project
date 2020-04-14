// next 4 variables allocating stations to different regions on map.
var stephensGreen = [5,6,9,10,11,13,17,18,19,26,27,34,36,37,39,41,43,47,51,52,53,54,55,71,89,98,113,114];
var bordGais = [8,16,21,22,23,25,32,48,49,56,57,58,62,63,64,65,66,67,68,69,90,91,99,117];
var guinessStorehouse = [7,42,50,72,73,74,75,76,80,81,82,83,84,85,86,87,88,92,93,94,95,96,97,100];
var spire = [2,3,4,12,15,24,28,29,30,31,33,38,40,44,45,59,61,77,78,79,101,102,103,104,105,106,107,108,
109,110,111,112,115];


// Global arrays needed for various functions.
// need two global arrays to store names as when generate first line graph for average days
// user need to select a day dropdown to call the second graph
// stations global array used to store static station data
// livebike global array used to store live occupancy station data
var stationName;
var stationID;
var chartHours;
var chartDays;
var futureDates=[];
var stations=[];
var livebike=[];
var locationsArray = []
var distanceResults = []
var waypts = [];
var distanceAtoB;
var distanceBtoC;
var distanceCtoD;

function loadnewweather(x){
	$.getJSON('http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/futureweather', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			futureDates[i]=data[i].date + " " + data[i].day;

		}

        var uniqueDays = [];
			var count = 0;
			var start = false;

			for (j = 0; j < futureDates.length; j++) {
			    for (k = 0; k < uniqueDays.length; k++) {
			        if (futureDates[j] == uniqueDays[k] ) {
			            start = true;
			        }
			    }
			    count++;
			    if (count == 1 && start == false) {
			        uniqueDays.push(futureDates[j]);
			    }
			    start = false;
			    count = 0;
			}
			uniqueDays.length = 5;

		if (x ==null){
			populatenewDropdown(uniqueDays)
		}

		});

};


function populatenewDropdown(uniqueDays){
	$.each(uniqueDays, function (i, element) {
	$('#futureDays').append($('<option></option>').val(element).html(element));
	}

)};

//populates stations list with static bike data retrieved from db with Jquery

function loadstaticbike(x){
	$.getJSON('http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/static', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			//stations.push(data[i]);
			stations[i]=[data[i].ID, String(data[i].name), data[i].Latitude, data[i].Longtitude];
		}
		//As Jquery call is asynchronous we need to call below functions now to populate map and pass in station info as parameter, otherwise code may execute out of order

		// this if function required as if not the if user clicks bike and traffic lane then dropdown multiplies
		if (x ==null){
			populateDropdown(stations)
		}
		loadliveBike();

		});
};

//populates stationdropdown with static bike data
function populateDropdown(stations){
	$.each(stations, function (i, element) {
	//append station name to dropdown
	$('#stationdrop').append($('<option></option>').val(element[1]).html(element[1]));
	}
)
	// sort stations by alphabetical order https://stackoverflow.com/questions/12073270/sorting-options-elements-alphabetically-using-jquery
	$("#stationdrop").append($("#stationdrop option").remove().sort(function(a, b) {
    var at = $(a).text(), bt = $(b).text();
    return (at > bt)?1:((at < bt)?-1:0);
}));
	var stationdrop = document.getElementById("stationdrop");
	stationdrop.selectedIndex = 0;
};

//this var is a counter to make sure that alert box with nearest station only appears on first load.
var loadalert = 0;

function loadliveBike(){
	$.getJSON('http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/live', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			livebike[i]=[data[i].ID,String(data[i].availableBikeStands), String(data[i].availableBikes)];
		}

		populateInfo(livebike);

        initMap.marker()

		if(loadalert ==0){
			// ask user if they would like to share their location
			getLocation()
			loadalert = loadalert+1;
		}
		});
};

//add in live occupancy info under dropdown menu for each station
function populateInfo(live){
 $('select').off().on('change', function() {
	  for (i = 0; i < stations.length; i++) {
		 //search name user selects against static station array
		 if (this.value==stations[i][1]){
			 document.getElementById("loaderGraphDays").style.display = "block";
			 lineGraphDays(stations[i][0],this.value);
			 for (j=0; j<live.length; j++){
				//find id match from static station array to id in live station info
				if(stations[i][0]==live[j][0]){
					var Info=('<br /> <b>Available Bike Stands: </b>'+live[j][1]+ '<br /><br />'+'<b>Available Bikes: </b>'+live[j][2]);
                    document.getElementById("bikeInfo").style.fontSize = "small";
					document.getElementById("bikeInfo").innerHTML = Info;
					// display day dropdown
					var dayDropdown = document.getElementById("futureDayDropdown");
					dayDropdown.style.display = "block";
					var resetDropdown = document.getElementById("futureDays");
					resetDropdown.selectedIndex = null;
			 }}}}
 })};

//all map related data enclosed in initMap function
function initMap(x) {

	// if map re initialised and direction results from previous search are displayed then hide them.
	document.getElementById("result").style.display = "none";

	var x = x;

	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	bikeLayer = new google.maps.BicyclingLayer();
	trafficLayer = new google.maps.TrafficLayer();
	markers = [];

	var map = new google.maps.Map(
	document.getElementById('map'), {zoom: 13.1,center: {lat: 53.346701, lng: -6.266961}, styles: [
	//code below removes some labels
	//{featureType: "all", elementType: 'labels', stylers: [{ visibility: "off" }]},
	//{featureType: "poi", elementType: 'labels', stylers: [{ visibility: "on" }]}
	]});

	if (x == '1' ){
		bikeLayer.setMap(map);
	}
	else if(x == '3'){
		trafficLayer.setMap(map);
	}

	loadnewweather(x);
	loadstaticbike(x);


	var infowindow = new google.maps.InfoWindow()

	var sizeX;
	var sizeY;


    // marker function initially sets size of markers depending on number of available bikes at stations
	function marker(){
	for (i = 0; i < stations.length; i++) {
		for (x = 0; x < livebike.length; x++){
			if (livebike[x][0] == stations[i][0]){
				if(livebike[x][2] >9){
					sizeX = 25;
					sizeY = 25;
				}
				else if(livebike[x][2] <10){
					sizeX = 18;
					sizeY = 18;
				}
			}
		}
    	//iterates through station data and plots markers for each station
		if (stephensGreen.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",scaledSize: new google.maps.Size(sizeX, sizeY)}})
			markers.push(marker);
		}
		else if (bordGais.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",scaledSize: new google.maps.Size(sizeX, sizeY)}})
			markers.push(marker);
		}
		else if (guinessStorehouse.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",scaledSize: new google.maps.Size(sizeX, sizeY)}})
			markers.push(marker);
		}
		else if (spire.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",scaledSize: new google.maps.Size(sizeX, sizeY)}})
			markers.push(marker);
		}

        // Add on-click function for each station marker, and populate dropdown with live occupancy information from database
		google.maps.event.addListener(marker, 'click', (function(marker, i){
			return function() {
			loadalert = loadliveBike+1;
			loadliveBike();
			for (j = 0; j < livebike.length; j++){
				if(stations[i][0]==livebike[j][0]){
					document.getElementById("loaderGraphDays").style.display = "block";
					lineGraphDays(stations[i][0],stations[i][1]);
					infowindow.setContent('<b>Station: </b>'+stations[i][1]+ '<br><b>Station ID: </b>' + stations[i][0]+'<br><b>Available Stands: </b>'+livebike[j][1]+'<br><b>Available Bikes: </b>'+livebike[j][2]);}
            }
			infowindow.close();
			infowindow.open(map, this);
			}}
		)(marker, i));
	}
	directionsRenderer.setMap(map);
	; ;
}
//Access function outside of retrive static info function scope
initMap.marker=marker
}

// This function is the main journey planner. It takes the start and end location typed in and calls other functions to find the closest stations.
function calcRoute() {
	document.getElementById("result").style.display = "none";
	document.getElementById("loader").style.display = "block";

	locationsArray.length = 0
	distanceResults.length = 0

	var start = document.getElementById('start').value+'-Dublin';
	startFormat = start.replace(/\s/g, '-')

	var end = document.getElementById('end').value+'-Dublin';
	endFormat = end.replace(/\s/g, '-')

	if ( !document.getElementById('end').value | !document.getElementById('start').value){
		document.getElementById("result").style.display = "block";
		document.getElementById("loader").style.display = "none";
		document.getElementById("result").innerHTML ="<br />"+"Please enter both a start and end destination"
	}
	else if(document.getElementById('end').value == document.getElementById('start').value){
		document.getElementById("result").style.display = "block";
		document.getElementById("loader").style.display = "none";
		document.getElementById("result").innerHTML ="<br />"+"Start and end destination must be different"
	}

	else{
		findLatLongStart(startFormat);
	}
}

// pass in start location on website and it calls google maps api to get lat and long of it and call latlongend when done
function findLatLongStart(x){

	var location = x;

		//post location to flask to call google api
	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/googleapi', type: "POST", data: JSON.stringify(location),
	dataType: "json", contentType: "application/json; charset=utf-8", success: function(data, status, xhr){
		try {
			var latitude = data["results"][0]["geometry"]["location"]["lat"];
			var longitude = data["results"][0]["geometry"]["location"]["lng"];
			locationsArray.push(latitude,longitude);
			findLatLongEnd(endFormat)
		}
		catch(err) {
			document.getElementById("result").style.display = "block";
			document.getElementById("loader").style.display = "none";
			document.getElementById("result").innerHTML ="The directions cannot be calculated at this time, please try again shortly and check accuracy of information provided"+"<br />";
		}

		}
		});
}

// pass in end location on website and it calls google maps api to get lat and long of it and call distance function when done
function findLatLongEnd(x){

	var location = x;

		//post location to flask to call google api
	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/googleapi', type: "POST", data: JSON.stringify(location),
	dataType: "json", contentType: "application/json; charset=utf-8", success: function(data, status, xhr){
		try {
 		var latitude = data["results"][0]["geometry"]["location"]["lat"];
		var longitude = data["results"][0]["geometry"]["location"]["lng"];
		locationsArray.push(latitude,longitude);
		distance();
		}
		catch(err) {
		document.getElementById("result").style.display = "block";
		document.getElementById("loader").style.display = "none";
		document.getElementById("result").innerHTML ="The directions cannot be calculated at this time, please try again shortly and check accuracy of information provided"+"<br />";
		}
	}
	});
}


// this function compares the lat and long of the start and end location to all the stations to find the closest stations to start and end destinations. Calls directions render when done
function distance() {
	var startLat = locationsArray[0];
	var startLon = locationsArray[1];
	var endLat = locationsArray[2];
	var endLon = locationsArray[3];
	var unit = 'K';

	if ((startLat == endLat) && (startLon == endLon)) {
		return 0;
	}

	else {
		var closestStart = 0;
		var startStation = [];
		var closestEnd = 0;
		var endStation = [];
		//calculates for start station
		for (i = 0; i < stations.length; i++) {
			var radlatStart = Math.PI * startLat/180;
			var radlatStations = Math.PI * stations[i][2]/180;
			var thetaStart = startLon-stations[i][3];
			var radthetaStart = Math.PI * thetaStart/180;
			var distStart = Math.sin(radlatStart) * Math.sin(radlatStations) + Math.cos(radlatStart) * Math.cos(radlatStations) * Math.cos(radthetaStart);
			if (distStart > 1) {
				distStart = 1;
			}
			distStart = Math.acos(distStart);
			distStart = distStart * 180/Math.PI;
			distStart = distStart * 60 * 1.1515;
			if (unit=="K") { distStart = distStart * 1.609344 }
			if (unit=="N") { distStart = distStart * 0.8684 }
			if (i==0){
				closestStart = distStart.toFixed(2);
				startStation= stations[i];
			}
			else if (distStart < closestStart){
				closestStart = distStart.toFixed(2);
				startStation=stations[i];
			}

	}

		//calculates for end station
		for (x = 0; x < stations.length; x++) {
			var radlatEnd = Math.PI * endLat/180;
			var radlatStations = Math.PI * stations[x][2]/180;
			var thetaEnd = endLon-stations[x][3];
			var radthetaEnd = Math.PI * thetaEnd/180;
			var distEnd = Math.sin(radlatEnd) * Math.sin(radlatStations) + Math.cos(radlatEnd) * Math.cos(radlatStations) * Math.cos(radthetaEnd);
			if (distEnd > 1) {
				distEnd = 1;
			}
			distEnd = Math.acos(distEnd);
			distEnd = distEnd * 180/Math.PI;
			distEnd = distEnd * 60 * 1.1515;
			if (unit=="K") { distEnd = distEnd * 1.609344 }
			if (unit=="N") { distEnd = distEnd * 0.8684 }
			if (x==0){
				closestEnd = distEnd.toFixed(2);
				endStation= stations[x];
			}
			else if (distEnd < closestEnd){
				closestEnd = distEnd.toFixed(2);
				endStation=stations[x];
			}

		}
		distanceResults.push(startStation[0],startStation[1],closestStart,endStation[0],endStation[1],closestEnd);

		directionsRender();
	}
}

// uses results from distance function to render directions on the map.
function directionsRender(){

	for (i = 0; i < stations.length; i++) {
		if ( stations[i][0] == distanceResults[0]){
			var startLat = stations[i][2]
			var startLong = stations[i][3]
			waypts.push({
				location: startLat+","+startLong,
				stopover: true
			});
		}

		else if ( stations[i][0] == distanceResults[3]){
			var endLat = stations[i][2]
			var endLong = stations[i][3]
			waypts.push({
				location: endLat+","+endLong,
				stopover: true
			});
		}
	}

		var request = {
			origin: startFormat,
			destination: endFormat,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: 'WALKING'
			};

		directionsService.route(request, function(result, status) {
			distanceAtoB = result.routes[0].legs[0].distance.text;
			distanceBtoC = result.routes[0].legs[1].distance.text;
			distanceCtoD = result.routes[0].legs[2].distance.text;
		if (status == 'OK' && parseFloat(distanceAtoB) <10 && parseFloat(distanceBtoC) <10 && parseFloat(distanceCtoD) <10) {
			for(i=0; i<markers.length; i++){
				markers[i].setMap(null);
				}
		  directionsRenderer.setDirections(result)
		}
			//reset global variable
			waypts = [];

			directionsText();
		});

}

// uses results from distance function to display text directions info or relevant error message.
function directionsText(){

	var starttext = document.getElementById('start').value;
	var endtext = document.getElementById('end').value;

	document.getElementById("loader").style.display = "none";
	document.getElementById("result").style.display = "block";

	if(parseInt(distanceResults[2])>=10 || parseInt(distanceResults[5])>=10 || parseFloat(distanceAtoB) >=10 || parseFloat(distanceBtoC) >=10 || parseFloat(distanceCtoD) >=10 && distanceResults.length ==6){
		initMap(11)
		document.getElementById("result").style.display = "block";
		document.getElementById("result").innerHTML ="Start or End destination too far from station to calculate journey"+"<br />";
	}
	else if(distanceResults.includes(undefined) || distanceResults.includes("Nan")  || distanceResults.length  < 6 || distanceAtoB ==undefined || distanceBtoC ==undefined || distanceCtoD ==undefined || parseInt(distanceResults[2])>=10 || parseInt(distanceResults[5])>=10){
		initMap(11)
		document.getElementById("result").style.display = "block";
		document.getElementById("result").innerHTML ="The directions cannot be calculated at this time, please try again shortly and check accuracy of information provided"+"<br />";
	}
	else if(distanceResults[0] == distanceResults[3] ){
		initMap(11)
		document.getElementById("result").style.display = "block";
		document.getElementById("result").innerHTML ="The closest bike station to both "+starttext.toUpperCase()+" and "+endtext.toUpperCase()+" is ID: "+distanceResults[0]+" Name: "+distanceResults[1]+"<br />";
	}
	else{
		// calculate availble bikes and stands at start and end station.
		for (i = 0; i < livebike.length; i++) {
			if(distanceResults[0]==livebike[i][0]){
				availableBikes = livebike[i][2];
			}
			if(distanceResults[3]==livebike[i][0]){
				availableStands = livebike[i][1];
			}
		}

		document.getElementById("result").innerHTML ="<i class="+'"material-icons"'+"style="+">"+"directions_walk"+"</i>"+" "+distanceAtoB+" from "+starttext.toUpperCase()+" to station ID:"+distanceResults[0]+" Name: "+distanceResults[1]+". Available Bikes:"+availableBikes+"<br />"+

		"<i class="+'"material-icons"'+"style="+">"+"directions_bike"+"</i>"+" "+distanceBtoC+" from station ID:"+distanceResults[0]+" Name: "+distanceResults[1]+" to station ID:"+distanceResults[3]+" Name: "+distanceResults[4]+". Available Stands:"+availableStands+"<br />"+

		"<i class="+'"material-icons"'+"style="+">"+"directions_walk"+"</i>"+" "+distanceCtoD+" from station ID:"+distanceResults[3]+" Name: "+distanceResults[4]+" to "+ endtext.toUpperCase()+"<br />"
	}
		//reset global variables.
		distanceAtoB=0;
		distanceBtoC=0;
		distanceCtoD=0;

}


// this function reinitiates the map if user clicks on off value for bike or traffic. Depending on button pressed a different value of x will pass to initMap emphasising which layer to load.
function traffic(x) {
	initMap(x);
}

// On click of a marker or the dropdown this function generates the graph showing average occupancy per days. It also automatically call the linegraph days for Monday so this will auto load too.
function lineGraphDays(id,name){

	if(chartDays!=null){
		chartDays.destroy();
	}
	// display day dropdown
	var dayDropdown = document.getElementById("dayDropdown");
	dayDropdown.style.display = "block";
	var resetDropdown = document.getElementById("days");
	resetDropdown.selectedIndex = null;

	//saves name and ID as global variables
	stationID = id
	stationName = name

	//post ID to flask and result is graph
	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/linegraphdays',type: "POST",data: JSON.stringify(id),dataType: "json",
	contentType: "application/json; charset=utf-8",success: function(data, status, xhr){
		document.getElementById("loaderGraphDays").style.display = "none";
		// Line Graph
		chartDays = new Chart(document.getElementById("line-chart"), {
			type: 'line',data: {labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
			datasets: [{data: data,label: "Available Bikes",borderColor: "#3e95cd"
			 }]},options: {title: {display: true,text: "Station Name: "+name+" ID: "+id}}
		});
		document.getElementById("loaderGraphHours").style.display = "block";
		lineGraphHours("Monday")}});
};

// Similar to the above function this generates average occupancy per open hour of a selected station.
function lineGraphHours(day){
	document.getElementById("loaderGraphHours").style.display = "block";
	if(chartHours!=null){
        chartHours.destroy();
    }
	//post ID to flask and result is graph
	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/linegraphhours', type: "POST", data: JSON.stringify([day,stationID]),
	dataType: "json", contentType: "application/json; charset=utf-8", success: function(data, status, xhr){
		document.getElementById("loaderGraphHours").style.display = "none";

		chartHours = new Chart(document.getElementById("line-chart-hours"), {
			type: 'line',data: {labels: ["8-9","9-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22","22-23","23-00"],datasets: [{data: data,
			label: "Available Bikes",borderColor: "#3e95cd"}]},options: {title: {display: true, text: "Station Name: "+stationName+" ID: "+stationID}}
		});
	}});
};


function futurePredict(){
	var dayDropdown = document.getElementById("futureDays");
	var selectedDay = dayDropdown.options[dayDropdown.selectedIndex].text;
	var hourDropdown = document.getElementById("futurehours");
	var selectedHour = hourDropdown.options[hourDropdown.selectedIndex].text;

	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/predict',type: "POST",data: JSON.stringify([stationID,selectedDay,selectedHour]),dataType: "json",
	contentType: "application/json; charset=utf-8",success: function(data, status, xhr){
	    var predictInfo=('<br /> <b>Predicted Available Bikes: </b>'+ data);
	    document.getElementById("predictionInfo").innerHTML = predictInfo;
        document.getElementById("predictionInfo").style.fontSize = "small";

	}})

	jQuery.ajax ({
	url: 'http://ec2-18-233-150-27.compute-1.amazonaws.com:8080/futureweatherpredict',type: "POST",data: JSON.stringify([selectedDay,selectedHour]),dataType: "json",
	contentType: "application/json; charset=utf-8",success: function(data, status, xhr){
	    var predictWeather=('<b>The temperature will feel like: </b>'+ data[0].tempFeels + '<sup>°C</sup>'
	    + '<b> accompanied by: </b>' + data[0].descripton);
	    document.getElementById("predictionWeather").innerHTML = predictWeather;
        document.getElementById("predictionWeather").style.fontSize = "small";

	}})
	;

};


// Below commented out code was for getting users geolocation but this did not work on instance
// so hardcoded in a choice of locations.

// used w3 school tutorial https://www.w3schools.com/html/html5_geolocation.asp
//function getLocation() {
//		if (navigator.geolocation) {
//			navigator.geolocation.getCurrentPosition(showPosition, displayError);
//		}
//		else {
//			alert("Geolocation is not supported by this browser.");
//		}
//	return;
//}


//function showPosition(position) {
//	closestStation(position.coords.latitude,position.coords.longitude,'k')
//}

//function displayError(error) {
//  switch(error.code) {
//    case error.PERMISSION_DENIED:
//      alert("User denied the request for Geolocation.");
//      break;
//    case error.POSITION_UNAVAILABLE:
//      alert("Location information is unavailable.");
//      break;
//    case error.TIMEOUT:
//      alert("The request to get user location timed out.");
//      break;
//    case error.UNKNOWN_ERROR:
//      alert("An unknown error occurred.");
//      break;
//  }
//}


// this function replaces the commented out code above and picks at random from one of 4 locations a user can be in order to display different messages we have.
function getLocation() {
	Locations = [[53.329189, -6.264626],[53.357455, -6.273836],[53.345608, -6.233665],[53.344770, -6.303746]]
	randomChoice = Math.floor(Math.random() * 4);
	userLocation = Locations[randomChoice]
	closestStation(userLocation[0],userLocation[1],'k')

}


// below function receives in lat and lon of your current location and finds which
// bike station is closest to you and displays an alert showing user information.
function closestStation(lat, lon, unit) {
	var startLat = lat;
	var startLon = lon;
	var closestStart = 0;
	var startStation =0;

	//calculates for start station
	var hellostations = stations;

	for (i = 0; i < stations.length; i++) {
		var radlatStart = Math.PI * startLat/180;
		var radlatStations = Math.PI * stations[i][2]/180;
		var thetaStart = startLon-stations[i][3];
		var radthetaStart = Math.PI * thetaStart/180;
		var distStart = Math.sin(radlatStart) * Math.sin(radlatStations) + Math.cos(radlatStart) * Math.cos(radlatStations) * Math.cos(radthetaStart);
		if (distStart > 1) {
			distStart = 1;
		}
		distStart = Math.acos(distStart);
		distStart = distStart * 180/Math.PI;
		distStart = distStart * 60 * 1.1515;
		if (unit=="K") { distStart = distStart * 1.609344 }
		if (unit=="N") { distStart = distStart * 0.8684 }
		if (i==0){
			closestStart = distStart.toFixed(2);
			startStation= stations[i];
		}
		else if (distStart < closestStart){
			closestStart = distStart.toFixed(2);
			startStation=stations[i];
		}

}
	// find the available bikes in the closest station
		for (i = 0; i < livebike.length; i++) {
			if(startStation[0]==livebike[i][0]){
				availableBikes = livebike[i][2];
			}
		}
	if (stephensGreen.includes(startStation[0])){
	alert('(SIMULATED)\nHi, the closest bike station to your location is:\nID: '+startStation[0] +' Name: '+startStation[1]+'\nAvailable Bikes: '+availableBikes+'\n\nBe sure to check out St Stephens Green while you are in the area!');
	}
	else if (bordGais.includes(startStation[0])){
	alert('(SIMULATED)\nHi, the closest bike station to your location is:\nID: '+startStation[0] +' Name: '+startStation[1]+'\nAvailable Bikes: '+availableBikes+'\n\nThe Bord Gais theatre is close by so be sure to act extra civilised');
	}
	else if (guinessStorehouse.includes(startStation[0])){
	alert('(SIMULATED)\nHi, the closest bike station to your location is:\nID: '+startStation[0] +' Name: '+startStation[1]+'\nAvailable Bikes: '+availableBikes+'\n\nWhy not head along to the Guinness Storehouse while you are in the area? You have earned it!');
	}
	else if (spire.includes(startStation[0])){
	alert('(SIMULATED)\nHi, the closest bike station to your location is:\nID: '+startStation[0] +' Name: '+startStation[1]+'\nAvailable Bikes: '+availableBikes+'\n\nYou are nearby the Spire so keep an eye out. It is difficult to miss!');

}

}