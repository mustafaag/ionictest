(function() {
	'use strict';

	angular
		.module('listing.home')
		.factory('homeService', homeService);

	homeService.$inject = [];

	/* @ngInject */
	function homeService() {
		var service = {
			getCategoryImages: getCategoryImages,
			getCityName: getCityName
		};
		return service;

		// ***************************************************************

		function getCityName(){
			var cityName = 'Durres';
			return cityName;
		}

		function getCategoryImages(){
      return [{
        key: 'Bars',
        image: 'images/bars1.png'
      },{
        key: 'Clothing',
        image: 'images/clothing.png'
      },{
        key: 'Hotels',
        image: 'images/hotel2.png'
      },{
        key: 'Museums & Galleries',
        image: 'images/museum1.png'
      },{
        key: 'Restaurants',
        image: 'images/restaurant1.png'
			},{
        key: 'Night Clubs',
        image: 'images/club.png'
			}
		]
    }
	}
})();
