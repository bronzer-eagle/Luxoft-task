var myApp = angular.module('myApp', []);

myApp.controller('myController', function ($scope, $http) {
    $scope.user = {};

    loadData();

    function loadData() {
        $http.post('/data').success(function (data) {
            $scope.tableData = data;
        });
    }

    $scope.register = function () {
        console.log();
        $http.post('/addData', angular.toJson($scope.user)).success(function () {
            console.log('OK');
            loadData();
        })
    }
});

