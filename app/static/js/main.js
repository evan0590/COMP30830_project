var stations = [
	[5, 'CHARLEMONT PLACE', 53.330662, -6.260177],
	[6, 'CHRISTCHURCH PLACE', 53.343368, -6.27012],
	[9, 'EXCHEQUER STREET', 53.343034, -6.263578],
	[10, 'DAME STREET', 53.344007, -6.266802],
	[11, 'EARLSFORT TERRACE', 53.334019, -6.258371],
	[13, 'FITZWILLIAM SQUARE WEST', 53.336074, -6.252825],
	[17, 'GOLDEN LANE', 53.340803, -6.267732],
	[18, 'GRANTHAM STREET', 53.334123, -6.265436],
	[19, 'HERBERT PLACE', 53.334432, -6.245575],
	[26, 'MERRION SQUARE WEST', 53.339764, -6.251988],
	[27, 'MOLESWORTH STREET', 53.341288, -6.258117],
	[34, 'PORTOBELLO HARBOUR', 53.330362, -6.265163],
	[36, 'ST. STEPHENS GREEN EAST', 53.337824, -6.256035],
	[37, 'ST. STEPHENS GREEN SOUTH', 53.337494, -6.26199],
	[39, 'WILTON TERRACE', 53.332383, -6.252717],
	[41, 'HARCOURT TERRACE', 53.332763, -6.257942],
	[43, 'PORTOBELLO ROAD', 53.330091, -6.268044],
	[47, 'HERBERT STREET', 53.335742, -6.24551],
	[51, 'YORK STREET WEST', 53.339334, -6.264699],
	[52, 'YORK STREET EAST', 53.338755, -6.262003],
	[53, 'NEWMAN HOUSE', 53.337132, -6.26059],
	[54, 'CLONMEL STREET', 53.336021, -6.26298],
	[55, 'HATCH STREET', 53.33403, -6.260714],
	[71, 'KEVIN STREET', 53.337757, -6.267699],
	[89, 'FITZWILLIAM SQUARE EAST', 53.335211, -6.2509],
	[98, 'FREDERICK STREET SOUTH', 53.341515, -6.256853],
	[113, 'MERRION SQUARE SOUTH', 53.338614, -6.248606],
	[114, 'WILTON TERRACE (PARK)', 53.333653, -6.248345],
	[8, 'CUSTOM HOUSE QUAY', 53.347884, -6.248048],
	[16, 'GEORGES QUAY', 53.347508, -6.252192],
	[21, 'LEINSTER STREET SOUTH', 53.34218, -6.254485],
	[22, 'TOWNSEND STREET', 53.345922, -6.254614],
	[23, 'CUSTOM HOUSE', 53.348279, -6.254662],
	[25, 'MERRION SQUARE EAST', 53.339434, -6.246548],
	[32, 'PEARSE STREET', 53.344304, -6.250427],
	[48, 'EXCISE WALK', 53.347777, -6.244239],
	[49, 'GUILD STREET', 53.347932, -6.240928],
	[56, 'MOUNT STREET LOWER', 53.33796, -6.24153],
	[57, 'GRATTAN STREET', 53.339629, -6.243778],
	[58, 'SIR PATRICK DUNS', 53.339218, -6.240642],
	[62, 'LIME STREET', 53.346026, -6.243576],
	[63, 'FENIAN STREET', 53.341428, -6.24672],
	[64, 'SANDWITH STREET', 53.345203, -6.247163],
	[65, 'CONVENTION CENTRE', 53.34744, -6.238523],
	[66, 'NEW CENTRAL BANK', 53.347122, -6.234749],
	[67, 'THE POINT', 53.346867, -6.230852],
	[68, 'HANOVER QUAY', 53.344115, -6.237153],
	[69, 'GRAND CANAL DOCK', 53.342638, -6.238695],
	[90, 'BENSON STREET', 53.344153, -6.233451],
	[91, 'SOUTH DOCK ROAD', 53.341833, -6.231291],
	[99, 'CITY QUAY', 53.346637, -6.246154],
	[117, 'HANOVER QUAY EAST', 53.343653, -6.231755],
	[7, 'HIGH STREET', 53.343565, -6.275071],
	[42, 'SMITHFIELD NORTH', 53.349562, -6.278198],
	[50, 'GEORGES LANE', 53.35023, -6.279696],
	[72, 'JOHN STREET WEST', 53.343105, -6.277167],
	[73, 'FRANCIS STREET', 53.342081, -6.275233],
	[74, 'OLIVER BOND STREET', 53.343893, -6.280531],
	[75, 'JAMES STREET', 53.343456, -6.287409],
	[76, 'MARKET STREET SOUTH', 53.342296, -6.287661],
	[80, 'ST JAMES HOSPITAL (LUAS)', 53.341359, -6.292951],
	[81, 'ST. JAMES HOSPITAL (CENTRAL)', 53.339983, -6.295594],
	[82, 'MOUNT BROWN', 53.341645, -6.29719],
	[83, 'EMMET ROAD', 53.340714, -6.308191],
	[84, 'BROOKFIELD ROAD', 53.339005, -6.300217],
	[85, 'ROTHE ABBEY', 53.338776, -6.30395],
	[86, 'PARKGATE STREET', 53.347972, -6.291804],
	[87, 'COLLINS BARRACKS MUSEUM', 53.347477, -6.28525],
	[88, 'BLACKHALL PLACE', 53.3488, -6.281637],
	[92, 'HEUSTON BRIDGE (NORTH)', 53.347802, -6.292432],
	[93, 'HEUSTON STATION (CENTRAL)', 53.346603, -6.296924],
	[94, 'HEUSTON STATION (CAR PARK)', 53.346985, -6.297804],
	[95, 'ROYAL HOSPITAL', 53.343897, -6.29706],
	[96, 'KILMAINHAM LANE', 53.341805, -6.305085],
	[97, 'KILMAINHAM GAOL', 53.342113, -6.310015],
	[100, 'HEUSTON BRIDGE (SOUTH)', 53.347106, -6.292041],
	[2, 'BLESSINGTON STREET', 53.356769, -6.26814],
	[3, 'BOLTON STREET', 53.351182, -6.269859],
	[4, 'GREEK STREET', 53.346874, -6.272976],
	[12, 'ECCLES STREET', 53.359246, -6.269779],
	[15, 'HARDWICKE STREET', 53.355473, -6.264423],
	[24, 'CATHAL BRUGHA STREET', 53.352149, -6.260533],
	[28, 'MOUNTJOY SQUARE WEST', 53.356299, -6.258586],
	[29, 'ORMOND QUAY UPPER', 53.346057, -6.268001],
	[30, 'PARNELL SQUARE NORTH', 53.353462, -6.265305],
	[31, 'PARNELL STREET', 53.350929, -6.265125],
	[33, 'PRINCES STREET / OCONNELL STREET', 53.349013, -6.260311],
	[38, 'TALBOT STREET', 53.350974, -6.25294],
	[40, 'JERVIS STREET', 53.3483, -6.266651],
	[44, 'UPPER SHERRARD STREET', 53.358437, -6.260641],
	[45, 'DEVERELL PLACE', 53.351464, -6.255265],
	[59, 'DENMARK STREET GREAT', 53.35561, -6.261397],
	[61, 'HARDWICKE PLACE', 53.357043, -6.263232],
	[77, 'WOLFE TONE STREET', 53.348875, -6.267459],
	[78, 'MATER HOSPITAL', 53.359967, -6.264828],
	[79, 'ECCLES STREET EAST', 53.358115, -6.265601],
	[101, 'KING STREET NORTH', 53.350291, -6.273507],
	[102, 'WESTERN WAY', 53.354929, -6.269425],
	[103, 'GRANGEGORMAN LOWER (SOUTH)', 53.354663, -6.278681],
	[104, 'GRANGEGORMAN LOWER (CENTRAL)', 53.355173, -6.278424],
	[105, 'GRANGEGORMAN LOWER (NORTH)', 53.355954, -6.278378],
	[106, 'RATHDOWN ROAD', 53.35893, -6.280337],
	[107, 'CHARLEVILLE ROAD', 53.359157, -6.281866],
	[108, 'AVONDALE ROAD', 53.359405, -6.276142],
	[109, 'BUCKINGHAM STREET LOWER', 53.353331, -6.249319],
	[110, 'PHIBSBOROUGH ROAD', 53.356307, -6.273717],
	[111, 'MOUNTJOY SQUARE EAST', 53.356717, -6.256359],
	[112, 'NORTH CIRCULAR ROAD (OCONNELLS)', 53.357841, -6.251557],
	[115, 'KILLARNEY STREET', 53.354845, -6.247579]
	];

	// next 4 variables allocating stations to different regions on map.
	var stephensGreen = [5,6,9,10,11,13,17,18,19,26,27,34,36,37,39,41,43,47,51,52,53,54,55,71,89,98,113,114];
	var bordGais = [8,16,21,22,23,25,32,48,49,56,57,58,62,63,64,65,66,67,68,69,90,91,99,117];
	var guinessStorehouse = [7,42,50,72,73,74,75,76,80,81,82,83,84,85,86,87,88,92,93,94,95,96,97,100];
	var spire = [2,3,4,12,15,24,28,29,30,31,33,38,40,44,45,59,61,77,78,79,101,102,103,104,105,106,107,108,
	109,110,111,112,115];

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
        
	livebike=[];

	//Put function inside add listener to populate dropdown.
	function loadBike(){
		$.getJSON('http://127.0.0.1:5000/', function(data, status, xhr){
			for (var i = 0; i < data.length; i++ ) {
				livebike[i]=[data[i].ID,String(data[i].availableBikeStands), String(data[i].availableBikes)];
			console.log(livebike[0][0])
			}
			});
	};

	loadBike(); //put this in for addlistener to update

	console.log(livebike)

	var infowindow = new google.maps.InfoWindow()

	// 4 for loop iterating through station variables and plotting markers in different
	// colours
	for (i = 0; i < stations.length; i++) {  
		if (stephensGreen.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",scaledSize: new google.maps.Size(30, 30)}})
			markers.push(marker);
		}	
		else if (bordGais.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",scaledSize: new google.maps.Size(30, 30)}})
			markers.push(marker);
		}
		else if (guinessStorehouse.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",scaledSize: new google.maps.Size(30, 30)}})
			markers.push(marker);
		}		
		else if (spire.includes(stations[i][0])){
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(stations[i][2], stations[i][3]),
			map: map,icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",scaledSize: new google.maps.Size(30, 30)}})
			markers.push(marker);
		}	
		
		google.maps.event.addListener(marker, 'click', (function(marker, i){
			return function() {
			loadBike();
			for (j = 0; j < livebike.length; j++){
				if(stations[i][0]==livebike[j][0]){
					infowindow.setContent('<b>Station: </b>'+stations[i][1]+ '<br><b>Station ID: </b>' + stations[i][0]+'<br><b>Available Stands: </b>'+livebike[j][1]+'<br><b>Available Bikes: </b>'+livebike[j][2]);}}
			infowindow.close();
			infowindow.open(map, this);
			}}
		)(marker, i));
	}
	directionsRenderer.setMap(map);
}

var locationsArray = []
var distanceResults = []	
	
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


function checkAlert(evt) {
  
        if (evt.target.value === "St. Stephens Green") {
            populateFilters();
        } else if (evt.target.value === "Bord Gais") {
            populateGais();
        } else if (evt.target.value === "Guiness Storehouse") {
            populateGuiness();
        } else if (evt.target.value === "The Spire") {
            populateSpire();
        }
        


    }
    
    var xmlhttp = new XMLHttpRequest();
    var url='stephensGreen.json';
    console.log(url);
    var parsedObja;
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {            
            parsedObja = JSON.parse(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);                      
    xmlhttp.send();
    console.log(parsedObja);
    
    function populateFilters() {
        
        var selectCategory = document.getElementById("cat")
   
        var stephenStations = parsedObja.stephensGreen;
        var stephensList = []                              
        console.log(parsedObja);   
        for (var i = 0; i < stephenStations.length; i++) {
            stephenStations[i][1];
            console.log(stephenStations[i][1])
            stephensList.push(stephenStations[i][1]);
        }    
        for(var i = 0; i < stephensList.length; i++) {
            var station = stephensList[i];     
            var option = document.createElement("OPTION");
            selectCategory.options.add(option);
            option.text = station
            option.value = station
            selectCategory.add(option);      
        }
    }
    
    function populateGais() {
        
        var selectCategory = document.getElementById("cat")
        
        var gaisStations = parsedObja.bordGais;
        var gaisList = []
        
        for (var i = 0; i < gaisStations.length; i++) {
            gaisStations[i][1];
            console.log(gaisStations[i][1])
            gaisList.push(gaisStations[i][1]);  
        }
        for(var i = 0; i < gaisList.length; i++) {
            var station = gaisList[i];     
            var option = document.createElement("OPTION");
            selectCategory.options.add(option);
            option.text = station
            option.value = station
            selectCategory.add(option); 
        }
    }
    
    function populateGuiness() {
        
        var selectCategory = document.getElementById("cat")
        
        var guinessStations = parsedObja.guinessStorehouse;
        var guinessList = []
        
        for (var i = 0; i < guinessStations.length; i++) {
            guinessStations[i][1];
            console.log(guinessStations[i][1])
            guinessList.push(guinessStations[i][1]);  
        }
        for(var i = 0; i < guinessList.length; i++) {
            var station = guinessList[i];     
            var option = document.createElement("OPTION");
            selectCategory.options.add(option);
            option.text = station
            option.value = station
            selectCategory.add(option); 
        }
    }
    
    function populateSpire() {
        
        var selectCategory = document.getElementById("cat")
        
        var spireStations = parsedObja.spire;
        var spireList = []
        
        for (var i = 0; i < spireStations.length; i++) {
            spireStations[i][1];
            console.log(spireStations[i][1])
            spireList.push(spireStations[i][1]);  
        }
        for(var i = 0; i < spireList.length; i++) {
            var station = spireList[i];     
            var option = document.createElement("OPTION");
            selectCategory.options.add(option);
            option.text = station
            option.value = station
            selectCategory.add(option); 
        }
    }
