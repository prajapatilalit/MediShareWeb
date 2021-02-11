const express = require('express');
const router = express.Router();
const users = require('../controllers/usersCont');


router.post('/register/patient', users.usersValidate('patientReg'), users.patientReg);
router.post('/register/doctor', users.usersValidate('docReg'), users.docReg);
router.post('/register/org', users.usersValidate('orgReg'), users.orgReg);
router.post('/login', users.usersValidate('login'), users.login)


module.exports = router;

