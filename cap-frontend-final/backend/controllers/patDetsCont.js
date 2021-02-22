const patdts = require('../models/patientDets');
const { body, check, validationResult } = require('express-validator');

module.exports = {

    patDetsValidate: method => {

        switch(method)
        {
            case 'create_patDets': {
                return [

                    body('age', 'patient age not entered').notEmpty().withMessage('patient age invalid').isInt().trim().escape(),

                    body('gender', 'patient gender not entered').notEmpty().isIn(['M', 'F', 'O']).withMessage('patient gender invalid').trim().escape(),

                    body('bloodgroup', 'patient bloodgroup not entered').notEmpty().trim().escape(),

                    body('allergies', 'patient allergies not entered').notEmpty().trim().escape(),

                    body('occur_cond', 'patient occuring condition not entered').notEmpty().trim().escape(),

                    body('medication', 'patient medication not entered').notEmpty().trim().escape(),

                    body('emergency_no', 'patient emergency number not entered').notEmpty().isInt().withMessage('patient emergency number invalid').trim().escape()
                ]
            }
            /*
            case 'patDetsUpd': {
                return [
                    body('age', 'patient age not entered').notEmpty().isInt().withMessage('patient age invalid').trim().escape(),

                    body('gender', 'patient gender not entered').notEmpty().isIn(['M', 'F', 'O']).withMessage('patient gender invalid').trim().escape(),

                    body('bloodgroup', 'patient bloodgroup not entered').notEmpty().trim().escape(),

                    body('allergies', 'patient allergies not entered').notEmpty().trim().escape(),

                    body('occur_cond', 'patient occuring condition not entered').notEmpty().trim().escape(),

                    body('medication', 'patient medication not entered').notEmpty().trim().escape(),

                    body('emergency_no', 'patient emergency number not entered').notEmpty().isInt().withMessage('patient emergency number invalid').trim().escape()
                ]
            }

            */
            
        }
    },

    create_patDets: async(req, res) => {
        try {

            const errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }

        const {age, gender, bloodgroup, allergies, occur_cond, medication, emergency_no} = req.body;

            const newPatDets = new patdts({userinfo: req.body.id, age, gender, bloodgroup, allergies, occur_cond, medication, emergency_no, patReport: req.body.id})

            //patdts.populate(newPatDets, {path: 'UID', select: 'UID'}).then()
            const savedpatDets = await newPatDets.save();

           
            res.json({message: 'Patient details Saved successfully', data: savedpatDets});
          } catch (err) {
            res.status(400).json({
              status: 'fail',
              message: err
            });
          }
    },

    allPatDets: async(req, res) => {

    try
    {

        const patdets = await patdts.find({}).populate({path: 'userinfo', select: 'UID patient_name patient_email'}).sort('-createdAt');

        res.status(200).json({
                status: 'success',
                results: patdts.length,
                data: patdets
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    },

    patDets: async(req, res) => {
        const id = req.params.id;
    
        patdts.find({userinfo: id})
        .populate({path: 'userinfo', select: 'UID patient_name patient_email'})
        .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found patient detials with id " + id });
            else res.json(data);
          })
        .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving patient details with id=" + id });
          });
    },

    patDetsUpd: async(req, res) => {
        /*
        const errors = validationResult(req.body);

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
        
         const {age, gender, bloodgroup, allergies, occur_cond, medication, emergency_no} = req.body;

          if(bloodgroup || allergies || occur_cond || medication)
          {
              check(bloodgroup).notEmpty().trim().escape();
              check(allergies).notEmpty().trim().escape();
              check(occur_cond).notEmpty().trim().escape();
              check(medication).notEmpty().trim().escape();
          }
          else
          if(age || emergency_no)
          {
              check(age).notEmpty().isInt().withMessage('patient age invalid').trim().escape();
              check(emergency_no).notEmpty().isInt().withMessage('patient emergency number invalid').trim().escape();
          }
          else
          if(gender)
          {
              check(gender).notEmpty().isIn(['M', 'F', 'O']).withMessage('patient gender invalid').trim().escape();
          }

          */

        if(!req.body) {
            return res.status(400).send({
                message: "patient content cannot be empty"
            });
        }
    
        // Find and update patient detials with the request body
        patdts.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
        .then(result => {
            if(!result) {
                return res.status(404).send({
                    message: "patient details not found"
                });
            }
            else
            res.send({message: "patient details was updated successfully.", data: result });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "patient details not found with id " + req.params.id
                });                                      
            }
            return res.status(500).send({ 
                message: "Something wrong updating patient details with id " + req.params.id
            });
        });
    },

        patDetsDel: async (req, res) => {
 
            const id = req.params.id;
            
        patdts.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
        if (!data) {
        res.status(404).send({message: `Cannot delete patient details with id=${id}. Not Found`});
        } else {
        res.send({
        message: "patient details was deleted successfully"
        });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete patient details"
      });
    });
}

}