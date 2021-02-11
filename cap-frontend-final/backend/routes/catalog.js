const express = require('express');
const router = express.Router();
const patDtsCont = require('../controllers/patDetsCont');


// routes for patient details

// POST request to create patient details
router.post('/patients/create', patDtsCont.patDetsValidate('create_patDets'), patDtsCont.create_patDets);

// GET request to display the specific patient details 
router.get('/patients/:id', patDtsCont.patDets);

// GET request to display all the patient details
router.get('/patients', patDtsCont.allPatDets);

// PUT request to update the specific patient details
router.put('/patients/:id/update', patDtsCont.patDetsUpd);

// DELETE request to delete the specific patient details
router.delete('/patients/:id/delete', patDtsCont.patDetsDel);

module.exports = router;