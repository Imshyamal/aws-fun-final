angular.module('aws-fun')

.controller('ObjectController', ['$scope', '$http', '$mdToast', '$stateParams', function($scope, $http, $mdToast, $stateParams) {
    console.log('Frontend:Object Controller calling');


    var bucket = $stateParams.bucketName;
    console.log("Frontend:Object Controllet got Bucket Name:" + bucket);

    //condition to check for null
    $http.get('/bucketobjects/' + bucket).then(function successCallback(response) {
        console.log(response);
        if (response && response.data) {
            console.log("Frontend:Object Operation Controller got Objects:" + response.data);

            $scope.objectList = response.data;
        }

    }, function errorCallback(err) {
        console.log("Frontend:Object Operation Controller Server Error!!" + err);
    });





    $scope.deleteObject = function(fileNameF) {

        console.log("Frontend:Object Controllet got file Name:" + fileNameF);
        var data = {};

        data.FileName = fileNameF;
        data.BucketName = bucket;

        console.log("Front-End object Operation Controller delete object sendig data" + data);

        $http.post('/delete-object', data, null)
            .then(
                function successCallback(response) {
                    console.log("Frontend:Object Operation Controller file Deleted:" + response);

                    showToast(response)
                        //  window.location.reload(true);
                        //  $scope.getBucketList();
                },
                function errCallback(err) {
                    console.log("Frontend:Object Operation Controller File delete error" + err);
                    showToast(response.data.message)
                    console.log(err);
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

}])