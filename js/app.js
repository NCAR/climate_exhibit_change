(function () {
    'use strict';
    angular.module("edu.ucar.scied.climatechange", [
    "edu.ucar.scied.climatechange.controller",
    "edu.ucar.scied.webapp.controller",
    "edu.ucar.scied.webapp.service",
    "edu.ucar.scied.menulist.controller",
    "edu.ucar.scied.videos.controller",
    "edu.ucar.scied.diy_earth.controller",
    "edu.ucar.scied.footer.service",
    "edu.ucar.scied.footer.directive",
    "edu.ucar.scied.filters",
    "edu.ucar.scied.services",
    "ngRoute",
    "ngMaterial",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "angulartics",
    "angulartics.google.analytics"
    ]).
    config(["$routeProvider", function ($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "/core/templates/menu_grid.html",
            controller: "homeCtrl",
        }).
        when("/videos", {
            templateUrl: "/core/templates/menu_grid.html",
            controller: "videosCtrl",
        }).
        when("/videos/:videoId", {
            templateUrl: "/core/templates/video_player.html",
            controller: "playerCtrl"
        }).
        when("/apps/diy-earth", {
            templateUrl: "templates/diy_earth.html",
            controller: "diyEarthCtrl"
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
})();