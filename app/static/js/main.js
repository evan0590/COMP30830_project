// next 4 variables allocating stations to different regions on map.
var stephensGreen = [5,6,9,10,11,13,17,18,19,26,27,34,36,37,39,41,43,47,51,52,53,54,55,71,89,98,113,114];
var bordGais = [8,16,21,22,23,25,32,48,49,56,57,58,62,63,64,65,66,67,68,69,90,91,99,117];
var guinessStorehouse = [7,42,50,72,73,74,75,76,80,81,82,83,84,85,86,87,88,92,93,94,95,96,97,100];
var spire = [2,3,4,12,15,24,28,29,30,31,33,38,40,44,45,59,61,77,78,79,101,102,103,104,105,106,107,108,
109,110,111,112,115];


// need two global arrays to store names as when generate first line graph for average days
// user need to select a day dropdown to call the second graph.
var stationName;
var stationID;
var chartHours;
var chartDays;
var stations=[];
var livebike=[];
var locationsArray = []
var distanceResults = []

function loadstaticbike(){
	$.getJSON('http://127.0.0.1:5000/static', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			//stations.push(data[i]);
			stations[i]=[data[i].ID, String(data[i].name), data[i].Latitude, data[i].Longtitude];
		}   
		//As Jquery call is asynchronous we need to call below functions now to populate map and pass in station info as parameter, otherwise code may execute out of order

		populateDropdown(stations)    
		});
};

function populateDropdown(stations){
	$.each(stations, function (i, element) {
	//append station name to dropdown   
	$('#stationdrop').append($('<option></option>').val(element[1]).html(element[1]));
	}
)};

function loadliveBike(){
	$.getJSON('http://127.0.0.1:5000/live', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			livebike[i]=[data[i].ID,String(data[i].availableBikeStands), String(data[i].availableBikes)];
		}

		populateInfo(livebike);
        
        initMap.marker()
		});
};

//add in live occupancy info under dropdown menu for each station
function populateInfo(live){
 $('select').on('change', function() {
	  for (i = 0; i < stations.length; i++) { 
		 //search name user selects against static station array
		 if (this.value==stations[i][1]){
			 lineGraphDays(stations[i][0],this.value);
			 for (j=0; j<live.length; j++){
				//find id match from static station array to id in live station info
				if(stations[i][0]==live[j][0]){
					var Info=('<br /> <b>Available Bike Stands: </b>'+live[j][1]+ '<br /><br />'+'<b>Available Bikes: </b>'+live[j][2]);
					document.getElementById("bikeInfo").innerHTML = Info;            
			 }}}}
 })};

function initMap(x) {
	
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	bikeLayer = new google.maps.BicyclingLayer();
	trafficLayer = new google.maps.TrafficLayer();
	markers = [];
    
	var map = new google.maps.Map(
	document.getElementById('map'), {zoom: 13.1,center: {lat: 53.346701, lng: -6.266961}, styles: [
	//code below removes some labels
	{featureType: "all", elementType: 'labels', stylers: [{ visibility: "off" }]}, 
	{featureType: "poi", elementType: 'labels', stylers: [{ visibility: "on" }]}]			
	});
	
	if (x == '1' ){
		bikeLayer.setMap(map);
	}
	else if(x == '3'){
		trafficLayer.setMap(map);	
	}
    
    loadstaticbike();
   	
	loadliveBike();
        
	var infowindow = new google.maps.InfoWindow()
	
	var sizeX;
	var sizeY;
	
	// 4 for loop iterating through station variables and plotting markers in different
    //function to set size of markers depending on number of available bikes at stations
    //for each station against live bike info
    //if avail bikes of that station>10
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
			loadliveBike();
			for (j = 0; j < livebike.length; j++){
				if(stations[i][0]==livebike[j][0]){
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

	
	
function calcRoute() {

	var waypts = [];
	var distanceAtoB;
 	var distanceBtoC;
	var distanceCtoD;
	var tooFar = 0;
	locationsArray.length = 0
	distanceResults.length = 0
	
	var start = document.getElementById('start').value;
	startFormat = start.replace(/\s/g, '-')
	
	var end = document.getElementById('end').value;
	endFormat = end.replace(/\s/g, '-')
	
	if ( !document.getElementById('end').value | !document.getElementById('start').value){
		document.getElementById("result").innerHTML ="<br />"+"Please enter both a start and end destination"
	}
	else if(document.getElementById('end').value == document.getElementById('start').value){
		document.getElementById("result").innerHTML ="<br />"+"Start and end destination must be different"
	}
	
	else{ 
		findLatLong(startFormat);
		setTimeout(() => { findLatLong(endFormat); }, 2000);

		setTimeout(() => { 
		var result = distance();
		},4000);

		setTimeout(() => { 
		if ( parseInt(distanceResults[2])<10 && parseInt(distanceResults[5])<10){
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
				
				});			
		}
		},6000);

		// print results of directions to results div
		setTimeout(() => { 				
			if(parseInt(distanceResults[2])>=10 || parseInt(distanceResults[5])>=10 || parseFloat(distanceAtoB) >=10 || parseFloat(distanceBtoC) >=10 || parseFloat(distanceCtoD) >=10 && distanceResults.length ==6){
				initMap()
				document.getElementById("result").innerHTML ="Start or End destination too far from station to calculate journey"+"<br />";
			}
			else if(distanceResults.includes(undefined) || distanceResults.includes("Nan")  || distanceResults.length  < 6 || distanceAtoB ==undefined || distanceBtoC ==undefined || distanceCtoD ==undefined || parseInt(distanceResults[2])>=10 || parseInt(distanceResults[5])>=10){
				initMap()
				document.getElementById("result").innerHTML ="The directions cannot be calculated at this time, please try again shortly and check accuracy of information provided"+"<br />";					
			}		
			else if(distanceResults[0] == distanceResults[3] ){
				initMap()
				document.getElementById("result").innerHTML ="The closest bike station to both "+start.toUpperCase()+" and "+end.toUpperCase()+" is ID: "+distanceResults[0]+" Name: "+distanceResults[1]+"<br />";			
			}
			else{	
				document.getElementById("result").innerHTML ="<i class="+'"material-icons"'+"style="+">"+"directions_walk"+"</i>"+" "+distanceAtoB+" from "+start.toUpperCase()+" to station ID:"+distanceResults[0]+" Name: "+distanceResults[1]+"<br />"+

				"<i class="+'"material-icons"'+"style="+">"+"directions_bike"+"</i>"+" "+distanceBtoC+" from station ID:"+distanceResults[0]+" Name: "+distanceResults[1]+" to station ID:"+distanceResults[3]+" Name: "+distanceResults[4]+"<br />"+

				"<i class="+'"material-icons"'+"style="+">"+"directions_walk"+"</i>"+" "+distanceCtoD+" from station ID:"+distanceResults[3]+" Name: "+distanceResults[4]+" to "+ end.toUpperCase()+"<br />";
			}
		},9000);
	}
}
	
function findLatLong(x){

	var location = x; 

	var xmlhttp = new XMLHttpRequest();
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+",+Dublin&key=AIzaSyDFfQele6SPurbIljoHv4tVF5USA_7y1-o";  

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

		//Parse the JSON data to a JavaScript variable. 
		response = JSON.parse(xmlhttp.responseText);    
		// This function is defined below and deals with the JSON data parsed from the file. 
		var latitude = response["results"][0]["geometry"]["location"]["lat"];
		var longitude = response["results"][0]["geometry"]["location"]["lng"];	
		locationsArray.push(latitude,longitude); 

		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}	
	
function distance(lat1, lon1, lat2, lon2, unit) {
	var startLat = locationsArray[0];
	var startLon = locationsArray[1];
	var endLat = locationsArray[2];
	var endLon = locationsArray[3];

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

		return distanceResults;
	}
}
	
function traffic(x) {
	initMap(x);
}

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
	url: 'http://127.0.0.1:5000/linegraphdays',type: "POST",data: JSON.stringify(id),dataType: "json",
	contentType: "application/json; charset=utf-8",success: function(data, status, xhr){
		// Line Graph
		chartDays = new Chart(document.getElementById("line-chart"), {
			type: 'line',data: {labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
			datasets: [{data: data,label: "Available Bikes",borderColor: "#3e95cd"
			 }]},options: {title: {display: true,text: "Station Name: "+name+" ID: "+id}}
		});
		lineGraphHours("Monday")}});
};

function lineGraphHours(day){
	if(chartHours!=null){
        chartHours.destroy();
    }
	//post ID to flask and result is graph
	jQuery.ajax ({
	url: 'http://127.0.0.1:5000/linegraphhours', type: "POST", data: JSON.stringify([day,stationID]),
	dataType: "json", contentType: "application/json; charset=utf-8", success: function(data, status, xhr){
		chartHours = new Chart(document.getElementById("line-chart-hours"), {
			type: 'line',data: {labels: ["8-9","9-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22","22-23","23-00"],datasets: [{data: data,
			label: "Available Bikes",borderColor: "#3e95cd"}]},options: {title: {display: true, text: "Station Name: "+stationName+" ID: "+stationID}}
		});
	}});
};
