'use strict';

// declare a module
var mainGeolocations = angular.module('geolocations', ['ngRoute']);

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
//      $scope.geolocationPointTree=response.data;
      $scope.items=response.data;
      //сформировать линейное отражение!
  });
  
  $scope.checkFilter = function(item){
    return item.check;
  }
  
    $scope.toggle = function (item) {
        item.collapsed = !item.collapsed;
    }
    $scope.toggleCheck = function(item){
      item.check = !item.check;
    }
});

mainGeolocations.directive('myTreeview', [function () {
    return {
        restrict: 'A',
        priority: 1001,
        controller: 'GeolocationController',
        compile: function (element, tAttrs) {
            //создаем шаблон для дочерних элементов
            angular.forEach(angular.element(element.find('li')), function (item) {
                var el = angular.element(item);

                el.prepend($('<i />').addClass('normal').attr('ng-hide', 'config.hasChildrens'));
                el.prepend($('<i />').addClass('expanded').attr('ng-show', 'config.hasChildrens && !config.collapsed').attr('ng-click', 'collapse(config)'));
                el.prepend($('<i />').addClass('collapsed').attr('ng-show', 'config.hasChildrens && config.collapsed').attr('ng-click', 'collapse(config)'));
            });
            
            var itemTemplate = element.html();
            //var template = $('<ul ng-hide="config.collapsed" />').append(itemTemplate)[0].outerHTML;
            var template = $('<ul ng-hide="config.collapsed" ng-if="!item.collapsed" />').append(itemTemplate)[0].outerHTML;

            return function (scope, element, attrs, ctrl) {
                //делаем доступным шаблон для дочерней дерективы
                ctrl.Template = template;
                element.addClass('treeview');
                scope.collapse = function (config) {
                    config.collapsed = !config.collapsed;
                }
            }
        }
    }
} ])

//достраивает дочерние элемент
mainGeolocations.directive('myTreeviewChilds', ['$compile', '$parse', function ($compile, $parse) {
    return {
        restrict: 'A',
        require: '^myTreeview',
        link: function (scope, element, attrs, ctrl) {
            //достаем дочерние элементы
            var items = $parse(attrs.myTreeviewChilds)(scope);
            var newScope = scope.$new();
            newScope.items = items;
            scope.config = {};
            if (items != null && items.length > 0) {
                newScope.$parent.config.hasChildrens = true;
                newScope.$parent.config.collapsed = false;
                element.append($compile(ctrl.Template)(newScope));
            }
            else {
                newScope.$parent.config.hasChildrens = false;
                newScope.$parent.config.collapsed = false;
            }
        }
    }
} ])