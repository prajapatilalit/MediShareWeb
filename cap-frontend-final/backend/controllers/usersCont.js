require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const Patient = require("../models/patientModel");
const Orgs = require('../models/organizationModel');
const Docs = require('../models/doctorModel');

module.exports = {

    usersValidate: method => {
      switch (method) {

        case 'patientReg': {
          return [
            body('patient_name', 'patient name not entered').notEmpty().trim().escape(),
    
            body('patient_email', 'patient email not entered').notEmpty().isEmail().withMessage('patient email invalid').normalizeEmail().trim().escape(),
    
            body('password', 'password not entered').notEmpty().isLength({min: 5}).withMessage('password must be atleast 5 characters').trim().escape(),
    
            body('patient_phone_no', 'patient mobile number not entered').notEmpty().isInt().withMessage('patient mobile number invalid').isLength({min: 10, max: 10}).withMessage('patient mobile number should be 10 digits').trim().escape()
          ]
        }

        case 'docReg': {

          return [

            body('doctor_name', 'doctor name not entered').notEmpty().trim().escape(),
    
            body('doctor_email', 'doctor email not entered').notEmpty().isEmail().withMessage('doctor email invalid').normalizeEmail().trim().escape(),
    
            body('password', 'password not entered').notEmpty().isLength({min: 5}).withMessage('password must be atleast 5 characters').trim().escape(),
    
            body('doctor_phone_no', 'doctor mobile number not entered').notEmpty().withMessage('doctor mobile number invalid').isLength({min: 10, max: 10}).withMessage('doctor mobile number should be 10 digits').trim().escape(),

            body('degree', 'doctor degree not entered').notEmpty().trim().escape(),

            body('specialisation', 'doctor specialisation not entered').notEmpty().trim().escape(),

            body('type_work', 'doctor work type not selected').notEmpty().isIn(['clinic', 'hospital']).withMessage('doctor work type invalid').trim().escape(),

            body('address', 'doctor address not entered').notEmpty().trim().escape(),
          ]
        }

        case 'orgReg': {

          return [

            body('org_name', 'organization name not entered').notEmpty().trim().escape(),
    
            body('org_email', 'organization email not entered').notEmpty().isEmail().withMessage('organization email invalid').normalizeEmail().trim().escape(),
    
            body('password', 'password not entered').notEmpty().isLength({min: 5}).withMessage('password must be atleast 5 characters').trim().escape(),
    
            body('org_phone_no', 'organization contact number not entered').notEmpty().withMessage('organization contact number invalid').trim().escape(),

            body('reg_no', 'organization registration number not entered').notEmpty().matches(/^[a-zA-Z0-9]{8}$/, 'i').withMessage('organization registration number should be 8 alphanumeric characters').trim().escape(),

            body('reg_role', 'registrar role not entered').notEmpty().trim().escape(),

            body('org_head_addr', 'organization head office address not entered').notEmpty().trim().escape(),

            body('reddrsl_no', 'organization reddressal number not entered').notEmpty().withMessage('organization redressal number invalid').trim().escape()
          ]
        }

        case 'login': {
          return [
            body('email', 'user email not entered').notEmpty().isEmail().withMessage('user email invalid').normalizeEmail().trim().escape(),

            body('password', 'password not entered').notEmpty().isLength({min: 5}).withMessage('password must be atleast 5 characters').trim().escape()
          ]
        }
      }
    },

    patientReg: async (req, res) => {
      
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
          try 
          {
          const { UID,patient_name,patient_email,password,passwordCheck,patient_phone_no} = req.body;
          console.log(req.body);
      
          if (password !== passwordCheck)
            return res
              .status(400)
              .json({ msg: "Enter the same password twice for verification." });
      
          const existingUser = await Patient.findOne({ patient_email: patient_email });
          if (existingUser)
            return res
              .status(400)
              .json({ msg: "An account with this email already exists." });
      
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);

          const newPat = await Patient.create({UID, patient_name, patient_email, password: passwordHash, patient_phone_no});

          res.status(201).json({message: 'patient registered successsfully', data: newPat})
          }
          catch (err) {
            res.status(400).json({
              status: 'fail',
              message: err
            });
          }
        },

      docReg: async (req, res) => {

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
          try 
          {
          const { UID, doctor_name, doctor_email, password, passwordCheck, doctor_phone_no, degree, specialisation, type_work, address} = req.body;

          if (password !== passwordCheck)
            return res
              .status(400)
              .json({ msg: "Enter the same password twice for verification." });
      
          const existingUser = await Docs.findOne({ doctor_email: doctor_email });
          if (existingUser)
            return res
              .status(400)
              .json({ msg: "An account with this email already exists." });
      
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
      
      
          const newDoc = await Docs.create({UID, doctor_name, doctor_email, password: passwordHash, doctor_phone_no, degree, specialisation, type_work, address});
          
          res.json({message: 'doctor registered successfully', data: newDoc});
        } catch (err) {
          res.status(400).json({
            status: 'fail',
            message: err
          });
      }
    },

      orgReg: async (req, res) => {

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }

          try {
          const { UID, org_name, org_email, password, passwordCheck, org_phone_no, reg_no, reg_role, org_head_addr, reddrsl_no} = req.body;
      
          if (password !== passwordCheck)
            return res
              .status(400)
              .json({ msg: "Enter the same password twice for verification." });
      
          const existingUser = await Orgs.findOne({ org_email: org_email });
          if (existingUser)
            return res
              .status(400)
              .json({ msg: "An account with this email already exists." });
      
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
      
      
          const newOrg = await Orgs.create({UID, org_name, org_email, password: passwordHash, org_phone_no, reg_no, reg_role, org_head_addr, reddrsl_no});

          res.json({message: 'organization registered successfully', data: newOrg});
        } catch (err) {
          res.status(400).json({
            status: 'fail',
            message: err
          });
      }
      },
      
      login: async (req, res) => {
        try {

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }

          const { email, password } = req.body;
           
          const user = await Patient.findOne({patient_email: email}) || await Docs.findOne({doctor_email: email}) || await Orgs.findOne({org_email: email});
          const patUser = await Patient.findOne({patient_email: email})
          if (!user)
            return res
              .status(400)
              .json({ msg: "No account with this email has been registered." });
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
      
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '12h'});
          res.json({
            status: 'success',
            message: 'user found !!',
            token: token,
            user: user
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
}