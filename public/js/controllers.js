var myApp = angular.module('myApp', []);

myApp.controller('myController', function ($scope, $http) {
    $scope.user = {};
    $scope.tableData = [];
    $scope.valid = true;

    loadData();

    $scope.register = function (isValid) {
        if (isValid) {
            $scope.valid = true;
            $http.post('/addData', angular.toJson($scope.user)).success(function () {
                loadData();
                $scope.user = {};
                $scope.tableForm.$setPristine();
                $scope.tableForm.$setUntouched();
            });
        } else {
            $scope.valid = false;
        }

    };

    function loadData() {
        console.log('send request');
        $http.post('/data').success(function (data) {
            console.log('we got it:');
            console.dir(data);
            $scope.tableData = data;
        });
    }
});

myApp.directive('numbers', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.numbers = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (!isNaN(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
});

