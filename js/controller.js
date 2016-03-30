var myMapApp = angular.module('myMapApp', []);
myMapApp.controller('myMapController', function($scope){
	
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
        '<a href="#" ng-click="directionsClick($index)" class="directions-info">Get Directions</a>' +
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

  $scope.map.setZoom(12);
  $scope.map.panTo({lat: $scope.markers[i].lat, lng: $scope.markers[i].lon});
  
}

$scope.directionsClick = function(i){
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('panel-map'));

         var request = {
           origin: 'Atlanta, GA', 
           destination:new google.maps.LatLng(lat,lon), 
           travelMode: google.maps.DirectionsTravelMode.DRIVING
         };

         directionsService.route(request, function(response, status) {
           if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
         }); 

}

 $scope.cities = cities;
	for(i=0;i<cities.length; i++){
	createMarker(cities[i]);
	}
});




