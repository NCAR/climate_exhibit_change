(function () {
    'use strict';
    angular.module('edu.ucar.scied.faq.controller', [])
        .controller('localFaqCtrl', localFaqCtrl)
        .controller('faqCtrl', faqCtrl);

    localFaqCtrl.$inject = ['$scope', 'Footer', 'WebApp'];
    function localFaqCtrl($scope, Footer, WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('faq');
        WebApp.setDataSource('data/faq.json');
        Footer.setPageTitle("Frequently Asked Questions");
                       
    }
    faqCtrl.$inject = ['$routeParams', 'ContentData','Footer', 'WebApp'];
    function faqCtrl($routeParams, ContentData, Footer, WebApp) {
        var vm = this;
        var json = {};
        vm.menuId = $routeParams.menuId;
        vm.itemId = $routeParams.itemId;
        
        ContentData(WebApp.getDataSource())
            .success(processData);
        
        function processData(list) {
            vm.data = json = list;

            if(vm.itemId){
                var ary = vm.data.categories[vm.menuId].questions;
                for(var i=0; i<ary.length;i++){
                    if(ary[i].id == vm.itemId){
                        vm.data = ary[i];
                        break;
                    }
                }
                vm.data.baseUrl = json.baseUrl;
                Footer.setPageTitle("FAQ: "+vm.menuId);
                Footer.setBackButton(true);
                Footer.setBackButtonText("Back");
                Footer.setBackPage(json.baseUrl+vm.menuId);
            } else if(vm.menuId) {
                vm.data = vm.data.categories[vm.menuId].questions;
                vm.data.baseUrl = json.baseUrl;
                Footer.setPageTitle("FAQ: "+vm.menuId);
                Footer.setBackButton(true);
                Footer.setBackButtonText("Back");
                Footer.setBackPage(json.baseUrl);
            } else {                
                Footer.setBackButton(false);
            }
        }
    }
})();