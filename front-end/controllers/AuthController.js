angular.module('aws-fun')


.controller('authentController', function($scope, $mdToast, $http, $mdDialog, $state) {
    console.log('Frontend:auth controller calling');



    $scope.validate = function() {
        console.log('Frontend:Inside Buttton click method');

        var data = {}; //created a empty data obj

        data.accessToken = $scope.accessKey;
        data.secretKey = $scope.secretAccessKey;

        console.log("Frontend:AWSController" + data.accessToken);
        console.log("frontend:AWSController" + data.secretKey);


        //call in a back end route to validate my key and token
        //$http.get('/someUrl', config).then(successCallback, errorCallback);
        /*
        function successCallback(){}
        function errorCallback(){}
        */
        $http.post('/authentication', data, null).then(
            function successCallback(data) {
                console.log(data);

                if (data.data) {

                    console.log("Success block");
                    showToast("you are Authenticated");


                } else {
                    console.log(data);
                    console.log("message" + data.data.message);
                    console.log("error block");
                    showToast("your token error" + data.data.message);
                }


            },
            function errorCallback(err) {
                showToast(err);
                console.log("Server Connection Error!" + err);



            }
        );

    }


    function showToast(msg) {


        $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .position('top right')
            .hideDelay(3000)
        );
    }




})