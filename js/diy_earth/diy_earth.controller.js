(function () {
    'use strict';
    angular.module('edu.ucar.scied.diy_earth.controller', [])
        .controller('diyEarthCtrl', diyEarthCtrl);
    diyEarthCtrl.$inject = ['$scope', 'ContentData', 'Footer', 'WebApp'];
    function diyEarthCtrl($scope, ContentData, Footer, WebApp) {
        WebApp.setShowFooter(true);
        WebApp.setBodyLayout('home');
        Footer.setBackButton(false);
        Footer.setPageTitle("Climate Explorer");
        $scope.isTimelineMode = true;
        $scope.showPopup = false;
        /*Timeline*/
        $scope.aPeriodIsSelected = false;
        $scope.selectedPeriod = {};
        $scope.diy_sun_dial = 'none';
        $scope.diy_co2_dial = 'none';
        $scope.diy_combos = [];
        $scope.diy_combos_C = [];
        $scope.diy_sun_index = 1;
        $scope.diy_co2_index = 2;
        $scope.earthNumber = 0;
        $scope.diy_earthTemp = -1; //'--'; // indicator that this hasn't been set before ... triggers default
        $scope.diy_earthTemp_C = -1; //'--'; // indicator that this hasn't been set before ... triggers default
        $scope.earthTemp = '--';
        $scope.earthTemp_C = '--';
        $scope.inactiveDescription = "";
        $scope.isInfo = false;
        var selectedFactor = null;
        $scope.showInfo = showInfoFunc;
        $scope.closePopup = closePopupFunc;
        $scope.toggleMode = toggleModeFunc;
        $scope.selectPeriod = selectPeriodFunc;
        $scope.select = selectFunc;

        ContentData('data/climateExplore/climate_explore.json')
            .success(processData);

        function processData(list) {
            $scope.data = list['data'];
            $scope.timelineData = $scope.data.timeline_data;
            $scope.selectPeriod($scope.timelineData[4]);
            $scope.diy_combos = $scope.data.diy_temps;
            $scope.diy_combos_C = $scope.data.diy_temps_c;
            $scope.inactiveDescription = $scope.data.timeline_inactive_description;
        }


        function showInfoFunc() {

            $scope.popupTitle = 'Incoming Sunlight & Trapped Heat';
            $scope.popupContent = $scope.data.dials_info;
            $scope.isInfo = true;
            $scope.showPopup = true;
        }

        function closePopupFunc() {
            $scope.showPopup = false;
            if ($scope.isInfo)
                $scope.isInfo = false;
            else {
                if (selectedFactor) {
                    selectedFactor.isSelected = false;
                    selectedFactor = null;
                }
            }
        }

        function toggleModeFunc() {
            $scope.isTimelineMode = !$scope.isTimelineMode;
            if ((!$scope.isTimelineMode) && ($scope.diy_earthTemp == -1)) {
                $scope.select($scope.data.diy_sun[1]);
                $scope.select($scope.data.diy_co2[2]);
            }
        }


        function selectPeriodFunc(aPeriod) {
            $scope.selectedPeriod = aPeriod;
            $scope.earthTemp = aPeriod.temperature;
            $scope.earthTemp_C = aPeriod.temperature_c;
            $scope.aPeriodIsSelected = true;
        }



        function selectFunc(aFactor) {
            $scope.isInfo = false; //not an info popup, don't show the image

            if (!aFactor.active) {
                if ($scope.isTimelineMode) {
                    $scope.showPopup = true;
                    $scope.popupTitle = aFactor.label;
                    $scope.popupContent = $scope.inactiveDescription;

                    aFactor.isSelected = true;
                    selectedFactor = aFactor;
                }
                return;
            }

            var factorMode = aFactor.mode;
            if (factorMode.indexOf("diy-sun") > -1) {
                //DIY earth -- sun
                angular.forEach($scope.data.diy_sun, function (afactor, key) {
                    afactor.isSelected = false;
                });

            } else if (factorMode.indexOf("diy-co2") > -1) {
                angular.forEach($scope.data.diy_co2, function (afactor, key) {
                    afactor.isSelected = false;
                });
            } else if (factorMode.indexOf("timeline-sun") > -1) {
                angular.forEach($scope.data.timeline_sun, function (afactor, key) {
                    afactor.isSelected = false;
                });
            } else if (factorMode.indexOf("timeline-co2") > -1) {
                angular.forEach($scope.data.timeline_co2, function (afactor, key) {
                    afactor.isSelected = false;
                });
            }
            aFactor.isSelected = true;
            selectedFactor = aFactor;
            if ($scope.isTimelineMode) {
                $scope.showPopup = true;
                $scope.popupTitle = aFactor.label;
                $scope.popupContent = aFactor.description;
            } else {
                if (factorMode.indexOf("sun") > -1) {
                    $scope.diy_sun_dial = aFactor.sun_dial;
                    switch (aFactor.sun_dial) {
                    case 'less':
                        $scope.diy_sun_index = 0;
                        break;
                    case 'more':
                        $scope.diy_sun_index = 1;
                        break;
                    }
                } else {
                    $scope.diy_co2_dial = aFactor.co2_dial;
                    switch (aFactor.co2_dial) {
                    case 'none':
                        $scope.diy_co2_index = 0;
                        break;
                    case 'less':
                        $scope.diy_co2_index = 1;
                        break;
                    case 'more':
                        $scope.diy_co2_index = 2;
                        break;
                    case 'most':
                        $scope.diy_co2_index = 3;
                        break;
                    }

                }

                var index = 4 * $scope.diy_sun_index + $scope.diy_co2_index;
                $scope.earthNumber = index + 1;
                $scope.diy_earthTemp = $scope.diy_combos[index];
                $scope.diy_earthTemp_C = $scope.diy_combos_C[index];
            }
        }
    };
})();