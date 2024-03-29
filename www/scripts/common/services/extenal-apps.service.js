(function() {
	'use strict';

	angular
		.module('listing.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		
		var service = {
			openMapsApp: openMapsApp,
			openExternalUrl: openExternalUrl,
			openPdf: openPdf
		};
		return service;

		// ****************************************************************

		function openPdf(url) {
			
			openExternalUrl(url);
		}

		function openMapsApp(coords,name) {
	
			if (angular.isObject(coords)) {
				coords = coords.latitude + ',' + coords.longitude;
			}

			var q;
			if (ionic.Platform.isAndroid()) {
				q = 'geo:0.0?q=' + coords + '('+name+')';
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			$window.location.href = q;
		}

		function openExternalUrl(url) {
			console.log(url);
			$window.open(url, '_system', 'location=yes');
			return false;
		}
	}
})();
