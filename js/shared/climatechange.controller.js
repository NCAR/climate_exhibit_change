(function () {
    'use strict';
    angular.module('edu.ucar.scied.climatechange.controller', [])
        .controller('homeCtrl', homeCtrl)
        .controller('videosCtrl', videosCtrl)
        .controller('playerCtrl', playerCtrl);

    homeCtrl.$inject = ['WebApp'];
    function homeCtrl(WebApp) {
        WebApp.setShowFooter(false);
        WebApp.setBodyLayout('home');
        WebApp.setMenuList('home');
        WebApp.setCols(3);
        WebApp.setDataSource('data/menu_main.json');
    }

    videosCtrl.$inject = ['ContentData', 'Footer', 'WebApp'];
    function videosCtrl(ContentData, Footer, WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('videos');
        WebApp.setMenuList('videos');
        WebApp.setCols(3);
        WebApp.setHeaderClass("larger");
        WebApp.setDataSource('data/menu_main.json');
        Footer.setPageTitle("Videos");        
        Footer.setBackButton(false);
    }

    playerCtrl.$inject = ['Footer', 'WebApp'];
    function playerCtrl(Footer,WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('video-player');
        Footer.setBackButton(true);
        Footer.setBackButtonText("Videos");
        Footer.setBackPage("#/videos");
    };
})();