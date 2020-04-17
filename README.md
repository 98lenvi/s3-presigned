# Presigned URL for file upload (AWS S3)

## How to run ?

`
git clone https://github.com/98lenvi/s3-presigned.git

cd ./s3-presigned

node index
`

The server will be running at 127.0.0.1:8080 locally. You will need to add the following in the index file

- [ ] YOUR_ACCESS_KEY
- [ ] YOUR_SECRET_KEY
- [ ] YOUR_BUCKET_NAME

Support for two types of operation is provided

- Upload
- Delete

## Upload

the following Endpoint is for upload

`
GET 127.0.0.1:8080/uploadFile?myKey=''&mimeType''
`
### Query parameters
- **myKey** should be the directory & file name where you would like to save the file in S3.
- **mimeType** should be of the file that is going to be uploaded, if there's a mismatch, then the upload will fail.

### Response
The URL will be sent in the response, on which you'd perform a `PUT` call, where the header would be as follows
`
headers: { 'Content-Type': 'MIME_TYPE' },
`

## Delete

the following Endpoint is for delete

`
DELETE 127.0.0.1:8080/deleteFile?myKey=''
`
### Query parameters
- **myKey** should be the directory & file name where the file you'd want to delete is in S3.

### Response
The success of operation will be sent in the response, 
