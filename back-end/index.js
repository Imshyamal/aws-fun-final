var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var cong = require('./keyconfig.js')


const config = {
    accessKeyId: '',
    secretAccessKey: '',
    sslEnabled: false,
    ForcePathStyle: true
};



var s3 = null;

function s3init(config) {
    s3 = new AWS.S3(config);
}



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'AWS Operations' });
});


router.post('/authentication', function(req, res, next) {
    console.log('Backend:inside auth under index route');

    config.accessKeyId = req.body.accessToken;
    config.secretAccessKey = req.body.secretKey;


    // console.log("got data from" + process.env.AWS_ACCESS_KEY_ID, process.env.AWS_ACCESS_KEY_ID);
    console.log("Backend: got data from controller", config.accessKeyId);
    console.log("Backend: got data from controller", config.secretAccessKey);


    var temp_s3 = new AWS.S3(config);


    temp_s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error", err);
            res.status(500);
            res.send(err);
            return;
        } else {
            s3init(config);
            res.status(200);
            res.json(data);
            return;
            console.log("Bucket List", data);
            //console.log("nameBucketsssss");



        }
    });



})


//============create Bucket==========================//

router.post('/create-bucket', function(req, res) {
    var params = {
        Bucket: req.body.bucket,
        ACL: 'public-read'
    };

    console.log("Backend bucket name received" + params);

    s3.createBucket(params, function(err, data) {
        if (err) {
            console.log("Backend:Create Bucket Error!!")
            res.status(500).send(err);

        } else {
            console.log("Backend:Bucket Created!!");
            res.status(200);
            res.json(data);



        }

    });
});



//===================================================//


//=====================Bucket list Operation===================//
router.get('/list-bucket', function(req, res) {
    params = {};
    if (s3 != null) {
        s3.listBuckets(params, function(err, data) {
            if (err) {
                console.log("Backend:/list-buckt " + err);
                res.send(false);
            } else {
                console.log("Backend:/list-buckt " + data);
                res.json(data);
            }
        });
    } else {
        //error response
        res.status(404).send({ message: "s3 is not congif please auth your self" });
    }
    // res.send(data.Buckets.length);
});

//=======================================================//

//========================Delete Bucket==========================//


checkBucketForObjects = function(paramContainingBucketName, callBack) {
    var self = this;
    s3.listObjectVersions(paramContainingBucketName, function(err, data) {
        if (err) {
            callBack(err, null);
            console.log("error listing bucket objects " + err);
            return;
        }
        var items = data.Versions;

        if (items.length > 0) {
            //we found obj/s
            callBack(null, false);
            console.log("bucket has objects");
            return;
        } else {
            //empty bucket
            callBack(null, true);
            console.log("Bucket is empty... burn IT!!");
            return;
        }
    });

};

deleteBucket = function(bucket, callback) {
    s3.deleteBucket(bucket, function(err, data) {
        if (err) {
            callback(err, false);
            console.log("error deleting bucket " + err);
        } else {
            callback(null, true);
            console.log("delete the bucket " + data);
        }
    });
};






router.post('/delete-bucket', function(req, res) {
    _bucketName = req.body.bucketName;

    params = {};
    params.Bucket = req.body.bucketName;

    // Checking Bucket If it has any objects or not ?
    checkBucketForObjects(params, function(err, isEmptyBucket) {
        if (err) {

            console.log("Backend: checkBucketForObjects callback error", +err);
            res.status(500).send(err);
            return;
        }
        if (isEmptyBucket) {
            deleteBucket(params, function(err, isDeleted) {
                if (err) {
                    console.log("Backend:deleteBucket callback error", +err);
                    res.status(500).send(err);
                    return;
                }
                if (isDeleted) {

                    console.log("Bucket Deleted" + _bucketName);
                    res.send({ message: _bucketName + " Bucket is deleted" });
                    return
                } else {

                    res.send({ message: "did not work! Sorry! Donate some money to build this function!" });
                    return
                }
            });
        } else {
            console.log("Files found in Bucket")
            res.send({ message: "Files found in the bucket. Do you want to delete the files?" })
        }
    });


});



//==================================================






module.exports = router;