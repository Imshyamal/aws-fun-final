var appJ = angular.module('aws-fun', ['ngMaterial', 'ngMessages', 'ui.router']);

appJ.config(function($stateProvider) {


    $stateProvider
        .state({
            name: "homePage",
            url: "/homePage",
            templateUrl: "/views/index.ejs", //template - html 1.

        })
        .state({
            name: "list-bucket",
            url: "/list-bucket",
            templateUrl: "/views/bucket-list.ejs", //template - html 1.

        })
        .state({
            name: "delete-bucket",
            url: "/delete-bucket",
            templateUrl: "/views/delete.ejs",

        })
        .state({
            name: "create-bucket",
            url: "/create-bucket",
            templateUrl: "/views/create-bucket.ejs",

        })
        .state({
            name: "authentications",
            url: "/authentications",
            templateUrl: "/views/authentications.ejs",

        })

});angular.module('aws-fun')


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

                console.log("Success block");
                showToast("you are Authenticated");
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




});angular.module('aws-fun')


.controller('bucketController', function($scope, $mdToast, $http, $mdDialog, $state) {
    console.log('Frontend:Bucket Controller calling');


    $scope.getBucketList = function() {

        $http.get('/list-bucket').then(function successCallback(response) {
            //list of buckets
            if (response && response.data) {
                $scope.bucketss = response.data.Buckets;
                console.log("frontend:listbucket success" + response.data.data.Buckets);
            }

        }, function errorCallback(err) {
            console.log("Error in server Please contact. " + err);
            console.log("frontend:listbucket errror" + response.data.message);
        });

    }


    $scope.deleteBucket = function(bucketNameF) {
        var bname = {
            bucketName: bucketNameF,
        }
        $http.post('/delete-bucket', bname)
            .then(
                function successCallback(response) {
                    showToast(response.data.message)
                    setInterval(
                        function() {
                            window.location.reload(true);
                        }, 3000);
                },
                function errCallback(err) {
                    showToast(response.data.message)
                    console.log(err);
                }
            );
    }



    //==============goToBucket() for getting specific bucket in list==================//
    $scope.goToBucket = function(bucketn, event) {
        console.log("AWSController:Got selected bucket from list--> " + bucketn);

        /* $mdDialog.show(
            $mdDialog.alert()
            .title('Navigating')
            .textContent('Bucket ' + bucketn)
            .ariaLabel('Person inspect demo')
            .ok('Okay')
            .targetEvent(event)
        ); */
    }

    function showToast(msg) {


        $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .position('top right')
            .hideDelay(3000)

        );
    }



});angular.module('aws-fun')


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







]);;angular.module('aws-fun')


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


});