 var map;
 jqeury.noConflict();
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 38.940965, lng: -77.127542},
	  zoom: 14
	});
	
	map.addListener('bounds_changed', updateMap);	
}


function updateMap(){
	var boundaries = map.getBounds();
	new AjaxRequest("./getOverlays.php",{
		method: get,
		parameters: {
			latitudeTop: boundaries.north,
			latitudeBottom: boundaries.south,
			longitudeLeft: boundaries.east,
			longitudeRight: boundaries.west		
		},
		onSuccess: redrawMap
	});
}


function redrawMap(ajax){
	var overlays = JSON.parse(ajax.responseText);
	overlays.each(addOverlay)
}

function addOverlay(overlay){
	var newOverlay = new google.maps.Polygon({

	if(overlay['type'] == 2){
		newOverlay = new google.maps.Polygon({
		paths: overlay.points,
		strokeColor: white,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: red,
		fillOpacity: 0.7
		});
		newOverlay.setMap(map);
	} else if(overlay['type'] == 1){
		newOverlay = new google.maps.Polyline({
			path: overlay.points,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 4
		});
	} else if(overlay['type'] == 0){
		newOverlay = new google.maps.Marker({
		map: map,
		draggable: true,
		position: overlay.points[0];
	});
	}
	var infowindow = new google.maps.InfoWindow({
		content: "<b>Description</b> : " + overlay.description + "<br /><b>Activity</b> : " + overlay.activity});
		newOverlay.addListener('mouseover', function(e) {
			infowindow.setPosition(e.latLng);
			infowindow.open(map);
		});
		newOverlay.addListener('mouseout', function() {
			infowindow.close();
	});
}