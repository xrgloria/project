 /*Created by Luke Schubert*/
 var map;
 var infoWindows = [];
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 38.940965, lng: -77.127542},
	  zoom: 14
	});
	addAllMarkers();
}


function addOverlays(lat, lng){
	var newOverlay = new google.maps.Marker({
			map: map,
			position: {lat: lat, lng: lng}
			});
}



