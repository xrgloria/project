 var map;
 var overlays;
 jquery.noConflict();
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 38.940965, lng: -77.127542},
	  zoom: 14
	});
	
	map.addListener('bounds_changed', updateMap);	
}


function updateMap(){
	var bounds = map.getBounds();
	var NE = bounds.getNorthEast();
	var SW = bounds.getSouthWest();
	var north = NE.lat();
	var east = NE.lng();
	var south = SW.lat();
	var west = SW.lat();
	new Ajax.Request("./getOverlays.php",{
		method: 'get',
		parameters: {
			latitudeTop: north,
			latitudeBottom: south,
			longitudeLeft: west,
			longitudeRight: east		
		},
		onSuccess: redrawMap
	});
}


function redrawMap(ajax){
	overlays = JSON.parse(ajax.responseText);
	for (i in overlays){
		addOverlay(i);
	}
}
function addOverlay(overlay){
	alert('adding overlay');
	var newOverlay;

	if(overlay['OVERLAY_TYPE'] == "2"){
		alert("adding polygon");
		newOverlay = new google.maps.Polygon({
		paths: overlay['POINTS'],
		strokeColor: white,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: red,
		fillOpacity: 0.7
		});
		newOverlay.setMap(map);
	} else if(overlay['OVERLAY_TYPE'] == "1"){
		alert("adding line");
		newOverlay = new google.maps.Polyline({
			path: overlay['POINTS'],
			geodesic: true,
			strokeColor: red,
			strokeOpacity: 1.0,
			strokeWeight: 4
		});
	} else{
		alert(overlay['POINTS'][0][0]);
		alert("adding point");
		newOverlay = new google.maps.Marker({
		map: map,
		position: overlay['POINTS'][0]
	});
	}
	var infowindow = new google.maps.InfoWindow({
		content: "<b>Description</b> : " + overlay['OVERLAY_NAME'] + "<br /><b>Activity</b> : " + overlay['ACTIVITY_NAME']});
	newOverlay.addListener('mouseover', function(e) {
			infowindow.setPosition(overlay['points'][0]);
			infowindow.open(map);
		});
		newOverlay.addListener('mouseout', function() {
			infowindow.close();
	});
}
