angular.module('aws-fun')


.controller('MainController', function($scope, $mdToast, $http, $mdDialog, $state) {
    console.log('main controller calling');

    $scope.gotoState = function(state) {
        if (state === 'auth') {


            $state.go(state);
            return;
        }
        $state.go(state);

    };

    function showToast(msg) {


        $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .position('top Right')
            .hideDelay(3000)
        );
    }


})