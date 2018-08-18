(function(){
    'use strict';

    angular.module('listing.location').factory('locationService',locationService);

    locationService.$inject = ['_','businessesService'];

    function locationService(_,businessesService){
        var pins;
        var service = {
            getPins:getPins,
            getCommon: getCommon
        }
        return service;
        function getPins(){
            return businessesService.getBusinesses().then(function(businesses) {
				pins = [];
				_.each(businesses, function(business) {
					if (business.mapdata && business.mapdata.annotations) {
						_.each(business.mapdata.annotations, function(annotation) {
							pins.push({
								title: annotation.title,
								lat: annotation.latitude,
								lon: annotation.longitude,
								businessId: business.guid
							});
						});
					}
				});
				return pins;
			});
        }
    
        function getCommon() {
			return businessesService.getCommon();
		}
    
    }

})();