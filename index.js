var express = require("express");
var app = express();
var cors = require('cors')
const AWS = require("aws-sdk");

app.use(cors());
app.get("/uploadFile", function(req, res) {
  const s3 = new AWS.S3();
  AWS.config.update({
    accessKeyId: "YOUR_ACCESS_KEY",
    secretAccessKey: "SECRET_KEY",
    signatureVersion: 'v4', //important
  });
  AWS.config.update({ region: "bucket region (not mandatory)" });
  const myBucket = "your_bucket_name";
  const myKey = "directory and filename";
  const signedUrlExpireSeconds = 60 * 5; //expiry duration of signed url

  const url = s3
  .getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: myKey,
    ContentType: 'audio/*', //for any content put * (Read about MIME types)
    Expires: signedUrlExpireSeconds,
  })
  res.end(url);
});

app.get("/deleteFile", function(req, res) {
    const s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: "YOUR_ACCESS_KEY",
      secretAccessKey: "SECRET_KEY",
      signatureVersion: 'v4', //important
    });
    AWS.config.update({ region: "bucket region (not mandatory)" });
    const myBucket = "your_bucket_name";
    const myKey = "directory and filename";
    var params = {
        Bucket: myBucket, 
        Delete: { // required
          Objects: [ // required
            {
              Key: myKey // required
            },
          ],
        },
      };
      
      s3.deleteObjects(params, function(err, data) {
        if (err){ console.log(err, err.stack);
         res.end(err)} // an error occurred
        else{     console.log(data); 
                  res.end('deleted')}          // successful response
      });
    })
  
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

