'use strict';

// declare a module
var mainGeolocations = angular.module('geolocations', ["ngRoute", 'ui.nestedSortable']);

mainGeolocations.config( ['$routeProvider', function($routeProvider) {
   $routeProvider.when('/geolocation/:geoLocationId',
   {
    templateUrl:'geolocation-detail/geolocation-detail.template.html',
    controller:'GeolocationController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);

mainGeolocations.controller("GeolocationController", function ($scope, $http) {
	// настройка контроллера
	$http({method: 'GET', url: 'server_api/geolocation.json'}).then(function success(response) {
      $scope.gelocationAttr=response.data;
      $scope.geoLocationName=$scope.gelocationAttr['name'];
      $scope.geoLocationDefault=$scope.gelocationAttr['default'];
  });
  
  $http({method: 'GET', url: 'server_api/geopoints.json'}).then(function success(response) {
      $scope.geolocationPointTree=response.data;
      //сформировать линейное отражение!
  });
  
  $http({method: 'GET', url: 'server_api/geolocationlist.json'}).
    then(function success(response) {
      $scope.geolocationList=response.data;
      
  });

  $scope.checkFilter = function(item){
    return item.check;
  }
});

