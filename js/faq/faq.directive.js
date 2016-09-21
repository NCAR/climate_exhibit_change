(function () {
    'use strict';
    angular.module('edu.ucar.scied.faq.directive', [])
        .directive('faqItem', faqItemDirective);

    function faqItemDirective() {
        return {
            restrict: 'E',
            template: '<ng-include src="getTemplateUrl()"/>',
            scope: {
                data: '=data'
            },
            controller: function ($scope) {
                //function used on the ng-include to resolve the template
                $scope.getTemplateUrl = function () {
                    if ($scope.data.data.displayType == "one-col-text-image"){
                        return "js/faq/one-col-text-image.html";
                    } else if ($scope.data.data.displayType == "two-col-text-image"){
                        return "js/faq/two-col-text-image.html";
                    } else if ($scope.data.data.displayType == "one-col-image-only"){
                        return "js/faq/one-col-image-only.html";
                    } else if ($scope.data.data.displayType == "one-col-text-only"){
                        return "js/faq/one-col-text-only.html";
                    } else {
                        return "js/faq/generic.html"
                    }
                }
            }
        }
    };
})();