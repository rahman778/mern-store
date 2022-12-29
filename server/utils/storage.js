import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./config/config.env") });

const s3Config = new aws.S3({
   accessKeyId: process.env.AWS_IAM_USER_KEY,
   secretAccessKey: process.env.AWS_IAM_USER_SECRET,
   Bucket: process.env.AWS_BUCKET_NAME,
});

const postS3Config = multerS3({
   s3: s3Config,
   bucket: process.env.AWS_BUCKET_NAME,
   acl: 'public-read',
   contentType: multerS3.AUTO_CONTENT_TYPE,
   metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
   },
   key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
   },
});

export const uploadFile = multer({
   storage: postS3Config,
   limits: {
      fileSize: 1024 * 1024 * 5,
   },
});

// export const deleteFile = async (fileuri) => {
//     const fileKey = fileuri.split('/').slice(-2).join("/");
//     return await s3Config.deleteObject({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: fileKey
//     }).promise();
// }

// export const s3Upload = async (image) => {
//    let imageUrl = "";

//    if (image) {
//       const s3bucket = new aws.S3({
//          accessKeyId: process.env.AWS_IAM_USER_KEY,
//          secretAccessKey: process.env.AWS_IAM_USER_SECRET,
//          Bucket: process.env.AWS_BUCKET_NAME,
//       });

//       const params = {
//          Bucket: keys.aws.bucketName,
//          Key: image.originalname,
//          Body: image.buffer,
//          ContentType: image.mimetype,
//          ACL: "public-read",
//       };

//       const s3Upload = await s3bucket.upload(params).promise();

//       imageUrl = s3Upload.Location;
//    }

//    return imageUrl;
// };
