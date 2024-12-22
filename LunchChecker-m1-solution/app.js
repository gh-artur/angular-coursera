(() =>{
'use strict';

angular.module('LunchChecker', [])

.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController($scope) {
    $scope.dishes = "";
    $scope.message = "";

    $scope.checkLunch = function() {
        var dishesArray = $scope.dishes.split(',');

        if(dishesArray.length == 1 && dishesArray[0] == "") {
            $scope.message = "Please enter data first";
            return;
        }

        if(dishesArray.length <= 3) {
            $scope.message = "Enjoy!";
        } else {
            $scope.message = "Too much!";
        }
    }

}


})();