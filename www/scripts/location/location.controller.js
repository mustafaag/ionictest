
(function(){
'use strict';

angular.module('listing.location').controller('LocationController',LocationController);

LocationController.$inject = ['$scope','common','pins','_','$cordovaGeolocation'];

function LocationController($scope,common,pins,_,$cordovaGeolocation){
    var vm = angular.extend(this,{
        zoom: common.map.zoomLevel,
        loc: getCurrentPosition(),
        
        origin: {
            lat: common.map.origin.latitude,
            lon: common.map.origin.longitude
        },
        currentLocation : getCurrentPosition(),
        markers:loadPoints(currentLocation)
        
    });

    function loadPoints(currentLocation){
        
        // console.log(vm.loc);
        var markers = [];
        markers.push(currentLocation);
        _.each(pins,function(pin){
            markers.push({
                name: pin.title+ getBusinessLink(pin.businessId),
                lat: pin.lat,
                lon: pin.lon,
                icon: 'images/markerred.png'
            });
        })
        return markers;
        
    }

    function getBusinessLink(businessId) {
        return '<br> <a href="#/app/map/businesses/' + businessId + '">More details</a>';
    }

    function getCurrentPosition(markers) {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log(lat,long);
         var marker= {
              name: 'Your location',
              lat: lat,
              long: long,
              icon: 'images/locationPerson.png'
          } 
          return marker;
        }, function(err) {
          // error
        });

        var watchOptions = {
            frequency : 1000,
            timeout : 3000,
            enableHighAccuracy: false // may cause errors if true
          };
    }
}


})();