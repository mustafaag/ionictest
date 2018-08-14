(function() {
	'use strict';

	angular
		.module('listing.map')
		.controller('MapLocationController', MapLocationController);

	MapController.$inject = ['$scope', 'common', 'pins', '_','$cordovaGeolocation'];

	/* @ngInject */
	function MapLocationController($scope, common, pins, _,$ordovaGeolocation) {
		var vm = angular.extend(this, {
			origin: {
				lat: common.map.origin.latitude,
				lon: common.map.origin.longitude
			},
			zoom: common.map.zoomLevel,
			currentLocation:currentLocation(),
			markers: loadPoints()
		});

		// ******************************************************************

		function loadPoints() {
			var markers = [];
			_.each(pins, function(pin) {
				markers.push({
					name: pin.title + getBusinessLink(pin.businessId),
					lat: pin.lat,
					lon: pin.lon
				});
			});
			return markers;
		}
		function currentLocation(){
			console.log($cordovaGeolocation);
			$cordovaGeolocation.getCurrentPosition().then((resp) => {
				console.log(resp);
			   }).catch((error) => {
				 console.log('Error getting location', error);
			   });
		}
		function getBusinessLink(businessId) {
			return '<br> <a href="#/app/map/businesses/' + businessId + '">More details</a>';
		}
	}
})();
