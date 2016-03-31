var myMapApp = angular.module('myMapApp', []);
myMapApp.controller('myMapController', function($scope){
	
  $scope.placesID = placesID;
  $scope.places = places;
  $scope.zoomIn = [];
	$scope.markers = [];
	$scope.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: new google.maps.LatLng(40.0000, -98.0000)
        });
  var infowindow = new google.maps.InfoWindow;

 function createMarker(city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          lat: Number(lat),
          lon: Number(lon),
          map: $scope.map,
          title: city.city,
          animation: google.maps.Animation.DROP,
        });

        var contentString = '<div class="city-content">'+
        '<div class="city-info"><h2>' +city.city + '</h2></div>' +
        '<div class="city-info">Rank: <strong>' +city.yearRank + '</strong></div>' +
        '<div class="city-info">State: <strong>' +city.state + '</strong></div>' +
        '<div class="city-info">Total Population: ' +city.yearEstimate + '</div>' +
        '<div class="city-info">2010 Census: ' +city.lastCensus + '</div>' +
        '<div class="city-info">Population Change: ' +city.change + '</div>' +
        '<div class="city-info">Land Area: ' +city.landArea + '</div>' +
        '<div class="city-info">Last Population: ' +city.lastPopDensity + '</div>' +
        '<a href="#" onclick="directionsClick('+lat+','+lon+')" class="directions-info">Get Directions</a>' +
        '</div>';

        marker.addListener('click', function() {
        infowindow.setContent(contentString);
        infowindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
       
 
 	}

$scope.cityClick = function(i){
  google.maps.event.trigger($scope.markers[i], 'click')
}

$scope.zoomClick = function(i){
    var latLon = cities[i].latLon.split(',');
      var lat = latLon[0];
      var lon = latLon[1];
    $scope.map.setZoom(12);
    $scope.map.panTo({lat: $scope.markers[i].lat, lng: $scope.markers[i].lon});
    $("#places-option").removeClass("hidden");
    $("#places-option").addClass("view-height");
    $("#map-panel").addClass("hidden");
    
    var center = new google.maps.LatLng(lat, lon);
        $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
        });
        for(i=0; i<cities.length; i++){
        createMarker(cities[i]);
        } 
        
    } 
        
    $scope.makePlaces = function(){
        var center = $scope.map.getCenter();
        $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
        });
        for(i=0; i<cities.length; i++){
        createMarker(cities[i]);
        } 

        var service = new google.maps.places.PlacesService($scope.map);
        service.nearbySearch({
          location: center,
          radius: 50000,
          type: checkedPlaces
        }, callback);
          
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker2(results[i]);
            
          }
        }
      }
     function createMarker2(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          position: placeLoc,
          map: $scope.map,
          title: place.city,
          animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open($scope.map, this);
        });
      }
  }
    directionsClick = function(lat, lon){
    $("#map-panel").addClass("hidden");
    $("#panel-map").addClass("view-height");

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'),{
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel-map'))
    
      var request = {
        origin: "Atlanta, GA",
        destination: new google.maps.LatLng(lat,lon),
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
  }

  $scope.cities = cities;
  for(var i = 0; i < cities.length; i++){
    createMarker(cities[i]);
}

  $scope.placeChecked = function(placeSent){
    checkedPlaces += placeSent + ", ";
    console.log(checkedPlaces);
    $scope.makePlaces();
  }

});




