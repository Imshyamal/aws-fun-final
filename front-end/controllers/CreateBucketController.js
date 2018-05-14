angular.module('aws-fun')


.controller('createBcktController', ['$scope', '$http', '$mdToast', '$stateParams', function($scope, $http, $mdToast, $stateParams) {
        console.log("Frontend:create bucket calling")
        $scope.bucketname = "";

        $scope.createBucket = function() {

            console.log("Frontend:Inside create Bucket Button:")
            console.log("Bucket Name :" + $scope.bucketname);

            $http.post('/create-bucket', { bucket: $scope.bucketname })
                .then(function successCallback(response) {
                    if (response.data) {
                        console.log("Bucket Created : " + response.data);
                        showToast("Bucket Created")
                    } else {
                        showToast("Something went wrong")
                    }
                    setInterval(
                        function() {
                            window.location.reload(true);
                        }, 2000);
                }, function errorCallback(err) {
                    console.log("Server Error!!" + err);
                });
        }


        function showToast(msg) {


            $mdToast.show(
                $mdToast.simple()
                .textContent(msg)
                .position('top right')
                .hideDelay(3000)

            );
        }
    }







]);