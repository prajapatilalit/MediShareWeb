require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');
const pdf = require('html-pdf');


         const BUCKET_NAME = process.env.BUCKET_NAME;
         const IAM_USER_KEY = process.env.S3_ACCESS_KEY;
         const IAM_USER_SECRET = process.env.S3_ACCESS_SECRET;
         
         const s3bucket = new AWS.S3({
             accessKeyId: IAM_USER_KEY,
             secretAccessKey: IAM_USER_SECRET
            });

  const fileFilter = (req, file, cb) => {
    
    const filetypes = /jpeg|png|pdf|rtf|pages/;

    // Check ext
     const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
   
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Invalid file type!');
    }
};

const upload = 
multer({     
              
    fileFilter,
    //limits: {fileSize: 1024 * 1024 * 5},
    storage: multerS3({
      acl: 'private',
      s3: s3bucket,
      //limits: { fieldSize: 8 * 1024 * 1024 },
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        const fileName = Date.now().toString() + "-" + file.originalname;
        cb(null, fileName);
      }
    })
  });

/*
  const data = function (req, res, next) {
    if(req.path === '/doctors/uploadReport')
    {
      multer.single('report')
      console.log('multer middleware');
    }
    next();
  }
*/


  module.exports = upload;