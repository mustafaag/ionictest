(function (){
    'use strict';

    angular.module ('listing.location', [
        'ionic'
    ]).config(function(stateDefinerProvider) {
      
        var stateDefiner = stateDefinerProvider.$get();

			stateDefiner.define({
                templateUrl: 'scripts/location/location.html',
				controller: 'LocationController',
				state: 'app.location',
				url: '/location',
			
                resolve: {
                    pins: function(locationService){
                        return locationService.getPins();
                    },
                    common: function(locationService){
                        return locationService.getCommon();
                    }
                }
            });
            console.log(stateDefiner);
    })

})();