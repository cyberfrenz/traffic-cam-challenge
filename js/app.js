// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(document).ready(function (){
	var mapElem = document.getElementById('map');

	var mapOptions = {
		Center: {lat: 47.6, lng: -122.3},
		zoom: 12
	}

	var map = new google.maps.Map(mapElem, mapOptions);

	var infoWin = new google.maps.InfoWindow();

	var marker = [];

	var coolIcon = 'star.png';

	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			var cam = data;
			data.forEach(function(cam) {
				var trafficLatLng = new google.maps.LatLng(cam.location.latitude,cam.location.longitude)
				var trafficMarker = new google.maps.Marker({
					position: trafficLatLng,
					map: map,
					icon: coolIcon,
					animation: google.maps.Animation.DROP
				});
				marker.push(trafficMarker);
				google.maps.event.addListener(trafficMarker, 'click', function() {
					map.panTo(trafficMarker.getPosition());
					infoWin.open(map,trafficMarker);
					console.log(trafficMarker);
					var content = '<p> Camera Label = ' + cam.cameralabel + '</p> ' + '<img src=' + cam.imageurl.url + '>' 
					infoWin.setContent(content);					
				});
				$('#search').bind('search keyup', function(){
					var lowerCamLabel = cam.cameralabel.toLowerCase();
					var lowerSearch = this.value.toLowerCase()
					console.log(lowerSearch);
					console.log(lowerCamLabel);
					if (lowerCamLabel.indexOf(lowerSearch) === -1) {
						trafficMarker.setMap(null);
					} else {
						trafficMarker.setMap(map);
					}
				});
				google.maps.event.addListener(map, 'click', function() {
					infoWin.close();
				});
			})
		})
		.fail(function(data) {
			alert("JSON not available");
		})
		.always(function(){
			
		})

});

	