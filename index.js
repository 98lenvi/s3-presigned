let express = require("express");
let app = express();
let cors = require("cors");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
  signatureVersion: "v4",
});
const myBucket = "YOUR_BUCKET_NAME";
const signedUrlExpireSeconds = 60 * 5;

app.use(cors());
app.get("/uploadFile", function (req, res) {
  let myKey = req.data.myKey;
  let mimeType = req.data.mimeType
  let params = {
    Bucket: myBucket,
    Key: myKey,
    ContentType: mimeType,
    Expires: signedUrlExpireSeconds,
  }
  const url = s3.getSignedUrl("putObject",params);
  res.end(url);
});

app.delete("/deleteFile", function (req, res) {
  let myKey = req.data.myKey;
  let params = {
    Bucket: myBucket,
    Delete: {
      Objects: [
        {
          Key: myKey,
        },
      ],
    },
  };
  s3.deleteObjects(params, function (err, data) {
    if (err) {
      console.error(err, err.stack);
      res.end(err);
    }
    else {
      console.log(data);
      res.end("deleted");
    }
  });
});

let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
