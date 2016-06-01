(function () {
    'use strict';
    angular.module('edu.ucar.scied.controllers.climatechange', [])
        .controller('homeCtrl', homeCtrl)
        .controller('videosCtrl', videosCtrl)
        .controller('playerCtrl', playerCtrl);

    function homeCtrl(WebApp) {
        WebApp.setShowFooter(false);
        WebApp.setBodyLayout('home');
        WebApp.setMenuList('home');
        WebApp.setCols(3);
        WebApp.setDataSource('data/menu_main.json');
    }

    function videosCtrl(ContentData,Footer, WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('videos');
        WebApp.setMenuList('videos');
        WebApp.setCols(3);
        WebApp.setHeaderClass("larger");
        WebApp.setDataSource('data/menu_main.json');
        Footer.setPageTitle("Videos");        
        Footer.setBackButton(false);
    }

    function playerCtrl(Footer,WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('video-player');
        Footer.setBackButton(true);
        Footer.setBackButtonText("Videos");
        Footer.setBackPage("#/videos");
    };
})();