require("dotenv").config();
const express = require('express');
const router = express.Router();
const patDtsCont = require('../controllers/patDetsCont');
const graphDets = require('../controllers/graphDets');
const upload = require('../controllers/repUploadCont');
const uplReport = require('../models/patReport');
const patPresCont = require('../controllers/patPresCont');

//const doct = require('../controllers/docCont');
const path = require('path');
const AWS = require("aws-sdk");
//const webview = require('webview');
var fs = require('fs');
//const { ManagedUpload } = require("aws-sdk/clients/s3");


// routes for graph details
router.post('/doctor/create/graph',  graphDets.createGraph);

// POST request to create patient details
router.post('/patients/create', patDtsCont.patDetsValidate('create_patDets'), patDtsCont.create_patDets);

//Get route to get patient grapph values 
router.get('/patient/:id/graphvalues', graphDets.getPatGraph);

// GET request to display the specific patient details 
router.get('/patients/:id', patDtsCont.patDets);

// GET request to display all the patient details
router.get('/patients', patDtsCont.allPatDets);

// PUT request to update the specific patient details
router.put('/patients/:id/update', patDtsCont.patDetsUpd);

// DELETE request to delete the specific patient details
router.delete('/patients/:id/delete', patDtsCont.patDetsDel);


router.post('/doctors/uploadReport', upload.single('report'), async(req, res) => {
    try 
    {
    const report = req.file;
    const reportpath = req.file.location;
    const patDetails = res.locals.id;

    const newReport = new uplReport({patDetails, report, reportpath});
    
    const savedReport = await newReport.save();
        // req.flash("success", "PDF successfully uploaded");
    res.json({message: 'success', report: savedReport, reportpath: reportpath})
    } catch (err) {
        res.json({status: 'upload failed', err: err.message})
    }
});


// GET request to download the patient report
router.get('/doctors/reports/download/:dlkey', function(req, res, next){
    // download the file via aws s3 here
    const dlkey = req.params.dlkey;

    //console.log('Trying to download file', fileKey);
    //var AWS = require('aws-sdk');
    AWS.config.update(
      {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
        region: 'ap-south-1'
      }
    );
    var s3 = new AWS.S3();
    const params = {
        Bucket : process.env.BUCKET_NAME,
        Key    : dlkey
    }

    uplReport.findOne({'report.key': dlkey}, {report: 0, reportpath: 0}).populate('patDetails', 'UID patient_name')
    .then(result => 
    {
   const readStream = s3.getObject(params).createReadStream();
   const writeStream = fs.createWriteStream(path.join(__dirname, '../report_download/'+ dlkey));
   readStream.pipe(writeStream);
   res.json({message: 'success', data: result, reportview: 'http://localhost:8000/report/view/' + dlkey});
}).catch(err => res.json({err: err.message}));
    
});

// POST request to create patient prescription details
router.post('/patients/prescriptions/create', patPresCont.createPres);

// GET request to display the specific patient prescription details 
//router.get('/patients/prescriptions/:patid', patPresCont.patPrescrip);

// GET request to display all the patient prescription details
router.get('/patients/prescriptions', patPresCont.allPatPres);

router.get("/patient/:id/pres", patPresCont.getPatPres);

// PUT request to add the specific patient prescription details
router.put('/patients/prescriptions/:presid/create', patPresCont.addPres);

// PUT request to update the specific patient prescription details
router.put('/patients/prescriptions/:presid/:medetid/update', patPresCont.addPres);

// PUT request to delete the specific patient prescription details
router.put('/patients/prescriptions/:presid/:medetid/delete', patPresCont.delPres);



module.exports = router;
