(function() {
	'use strict';

	angular
		.module('listing.main', [
			'ionic'
		])
		.config(function($stateProvider,$ionicConfigProvider) {
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/main/main.html'
					
				}, 
				
			);
			$ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
			$ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
			;
		});
})();