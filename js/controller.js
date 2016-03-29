var myMapApp = angular.module('myMapApp', []);
myMapApp.controller('myMapController', function($scope){
	
	
	$scope.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: new google.maps.LatLng(40.0000, -98.0000)
        });

 function createMarker(city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          map: $scope.map,
          title: city.city
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '<div>' + city.city + '</div>' +
            '<div>' + city.state + '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });

        marker.addListener('click', function() {
        infowindow.open($scope.map, marker);
        });
 
 	}
 $scope.cities = cities;
	for(i=0;i<cities.length; i++){
	createMarker(cities[i]);
	}
});



//         var contentStringATL = '<div id="content">'+
//             '<div id="siteNotice">'+
//             '</div>'+
//             '<h1 id="firstHeading" class="firstHeading">Atlanta, Georgia</h1>'+
//             '<div id="bodyContent">'+
//             '<p><b>Atlanta</b>, is the capital of and the most populous city in the U.S. state of Georgia ' +
//             'with an estimated 2013 population of 447,841. Atlanta is the cultural and economic center of the Atlanta area, '+
//             'home to 5,522,942 people and the ninth largest metropolitan area in the United States.['+
//             'Atlanta is the county seat of Fulton County, and a small portion of the city extends eastward into DeKalb County.'+
//             'Current Mayor:<a href="https://en.wikipedia.org/wiki/Kasim_Reed"> <b>Kasim Reed</b></a> '+
//             '<p>Attribution: Atlanta, <a href="https://en.wikipedia.org/wiki/Atlanta">'+
//             'https://en.wikipedia.org/wiki/Atlanta</a> '+ 
//             '(last visited March 29, 2016).</p>'+
//             '</div>'+
//             '</div>';
