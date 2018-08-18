(function() {
	'use strict';
	
	angular
		.module('listing.businesses')
		.controller('BusinessDetailsController', BusinessDetailsController);
	
	BusinessDetailsController.$inject = [
		'business', 'externalAppsService', 'openHoursService', 'distanceService',
		'state', 'favoriteBusinessesService', 'ionicToast', '$ionicModal','$cordovaEmailComposer' ,'$rootScope','$cordovaSocialSharing'];

	/* @ngInject */
	function BusinessDetailsController(business, externalAppsService, openHoursService,
		distanceService, state, favoriteBusinessesService, ionicToast, $ionicModal,$cordovaEmailComposer ,$rootScope,$cordovaSocialSharing,) {

		var vm = angular.extend(this, {
			currentDateTime: (new Date()).format('dddd HH:MM'),
			business: {
				isBusinessOpen: openHoursService.isBusinessOpen(business.openhours),
				distance: null,
				pictures: business.pictures,
				name: business.name,
				category: business.category,
				isInFavorites: favoriteBusinessesService.isInFavorites(business.guid),
				rating: business.rating,
				openHours: openHoursService.getHourFortheDay(business.openhours),
				description: business.description,
				phoneNumber:business.phoneNumber
			},
			showNews: showNews,
			showServices: showServices,
			showCatalogues: showCatalogues,
			showProducts: showProducts,
			showWordpress: showWordpress,
			showDrupal: showDrupal,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs,
			showReviews: showReviews,
			showFullScreenSlider: showFullScreenSlider,
			sendEmail:sendEmail,
			openFacebookPage:openFacebookPage,
			shareThis:shareThis,
			openCurrentLocation:openCurrentLocation,
			
			
		});

		(function activate() {
			setDistanceToOrigin();
		})();

		// *************************************************************
		
		function openCurrentLocation(){
			state.go('app.location');
		}
		function showFullScreenSlider() {
			var scope = $rootScope.$new();
			scope.vm = {
				images: vm.business.pictures,
				close: function() {
					scope.modal.hide();
					scope.modal.remove();
				}
			};
			$ionicModal.fromTemplateUrl('scripts/businesses/gallery.html', {
				scope: scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				scope.modal = modal;
				scope.modal.show();
			});
		}
		function sendEmail() {
			console.log($cordovaEmailComposer);
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: business.email,
					subject: 'Info Request',
					body: ''
				};

				$cordovaEmailComposer.open(email);
			});
		}
		function shareThis(){
			console.log($cordovaSocialSharing)
			$cordovaSocialSharing.share("test","hello","business.html","test.com").then(()=>{
				console.log("succes");
			}).catch(() => {
				console.log("err");
			  });
		}
		function toggleFavorites() {
			vm.business.isInFavorites = !vm.business.isInFavorites;
			if (vm.business.isInFavorites) {
				favoriteBusinessesService.addToFavorites(business.guid);
				ionicToast.show('\'' + vm.business.name + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				favoriteBusinessesService.removeFromFavorites(business.guid);
				ionicToast.show('\'' + vm.business.name + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function showReviews() {
			state.go('app.reviews', {
				businessId: business.guid
			});
		}

		function showContactUs() {
			state.go('app.contact-us', {
				businessId: business.guid
			});
		}

		function showProducts() {
			state.go('app.products', {
				businessId: business.guid
			});
		}

		function showNews() {
			state.go('app.articles', {
				businessId: business.guid
			});
		}

		function showServices() {
			state.go('app.services', {
				businessId: business.guid
			});
		}

		function showCatalogues() {
			state.go('app.catalogs', {
				businessId: business.guid
			});
		}

		function showWordpress() {
			state.go('app.wordpress-articles');
		}

		function showDrupal() {
			state.go('app.drupal-articles');
		}

		function setDistanceToOrigin() {
			distanceService.getDistanceToOrigin(business.officeLocation).then(function(distance) {
				vm.business.distance = distance;
			});
		}

		function getDirections() {
			externalAppsService.openMapsApp(business.officeLocation,business.name);
		}
		function openFacebookPage() {
			externalAppsService.openExternalUrl(business.facebookPage);
		}
	}
})();
