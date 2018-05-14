angular.module('aws-fun')


.controller('bucketController', function($scope, $mdToast, $http, $mdDialog, $state) {
    console.log('Frontend:Bucket Controller calling');


    $scope.getBucketList = function() {

        $http.get('/list-bucket').then(function successCallback(response) {
            //list of buckets
            if (response && response.data) {
                $scope.bucketss = response.data.Buckets;
                console.log("frontend:listbucket success" + response.data.Buckets);
            }

        }, function errorCallback(err) {
            console.log("Error in server Please contact. " + err);
            console.log("frontend:listbucket errror" + response.data.message);
        });

    }
    $scope.getBucketList();

    $scope.deleteBucket = function(bucketNameF) {
        var bname = {
            bucketName: bucketNameF,
        }
        $http.post('/delete-bucket', bname)
            .then(
                function successCallback(response) {
                    showToast(response.data.message)
                    $scope.getBucketList();
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


    $scope.gotoState = function(viewName, bucketName) {
        $state.go(viewName, { 'bucketName': bucketName });

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