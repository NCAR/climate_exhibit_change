angular.module("edu.ucar.scied.climatechange", [
    "edu.ucar.scied.controllers", 
    "edu.ucar.scied.controllers.videos",
    "edu.ucar.scied.controllers.climatechange",
    "edu.ucar.scied.controllers.climatechange.diy_earth",
    "edu.ucar.scied.services",
    "edu.ucar.scied.directives",
    "edu.ucar.scied.filters",
    "ngRoute",  
    "ngMaterial",    
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "angulartics", 
    "angulartics.google.analytics"
]).
config(["$routeProvider", function($routeProvider) {
  $routeProvider.
	when("/", 
         {
            templateUrl: "/core/templates/menu_grid.html", 
            controller: "homeCtrl",
        }
    ).
   when("/videos", 
         {
            templateUrl: "/core/templates/menu_grid.html", 
            controller: "videosCtrl",
        }
    ).
    when("/videos/:videoId", 
         {
            templateUrl: "/core/templates/video_player.html", 
            controller: "playerCtrl"
        }
    ).
    when("/apps/diy-earth", {
        templateUrl: "templates/diy_earth.html",
        controller: "diyEarthCtrl"
    }).
	otherwise({redirectTo: '/'});
}]);