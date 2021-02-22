
const patPres = require('../models/patPres');





module.exports = {

    
    createPres: async (req, res) => {

        


        try {
        console.log(req.body);
        //const userinfo = req.body.id
//i am seeing but cant talk manually
      var newData = new patPres(req.body)

      const savedpatDets = await newData.save();
        res.json({message: 'patient prescription saved successfully', result: savedpatDets})
        }catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            })
        }
    }, 
    
    
    //yes take control ________ wait 6 wait 2 secs 


    // {"UID":"g1ACPK8cPK6","medDetails":[{"med_name":"PPPPPPPP","duration":"qwd","morning_dose":"morinng - 1","evening_dosage":"Evening - 2"},{"med_name":"AAAAA","duration":"qwd","morning_dose":"morinng - 2","evening_dosage":"Evening - 1"}]}

    allPatPres: async(req, res) => {
        
        patPres.find({}).populate({path: 'userinfo', select: 'UID patient_name'}).sort('-createdAt')
        .then(result => {
            res.status(200).json({
                status: 'success',
                results: result.length,
                data: result
                
        }).catch (err => {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    })
    })
    },

    getPatPres : async(req, res) => {

        const id = req.params.id
        const patdets = await patPres.find({UID : id})
        if(patdets){
        res.status(200).json({
                status: 'success',
                results: patdets.length,
                data: patdets
        })}else{
            res.json("Error fetching data")
        }

    },
/*
    patPrescrip: async(req, res) => {
        const id = req.params.patid;
    
        patPres.find({userinfo: id})
        .populate({path: 'userinfo', select: 'UID patient_name'})
        .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found patient prescription detials with id " + id });
            else res.json(data);
          })
        .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving patient prescription details with id=" + id });
          });
    },
*/
    addPres: async(req, res) => {

        const id = req.params.presid;

        const  {med_name, duration, morning_dose, evening_dose} = req.body;
        //const userinfo = req.body.id
        const medDets = {med_name: med_name, duration: duration, morning_dose: morning_dose, evening_dose: evening_dose};
    
        // Find and add prescription detials with the request body
        patPres.findByIdAndUpdate(id, {$push: {medDetails: medDets}}, {safe: true, upsert: true, useFindAndModify: false})
        .then(result => {
            if(!result) {
                return res.status(404).send({
                    message: "patient details not found"
                });
            }
            else
            res.send({message: "prescription details was added successfully.", data: result });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "prescription details not found with id " + req.params.id
                });                                      
            }
            return res.status(500).send({ 
                message: "Something wrong adding prescription details with id " + req.params.id
            });
        });
    },

    updPres: async(req, res) => {

        //const patid = req.params.patid;
        const medid = req.params.medetid;

        if(!req.body) {
            return res.status(400).send({
                message: "prescription content cannot be empty"
            });
        }

        patPres.update({medDetails: {_id: medid}}, req.body, {safe: true, upsert: true, useFindAndModify: false}, 
        function (err, result) {
            if(err)
            res.send({status: 'fail', err: err.message})
            return res.json({status: 'success', data: result}) 
        })


    },

    delPres: async(req, res) => {

        const pres_id = req.params.presid;
        const medet_id = req.params.medetid;

        //const  {med_name, duration, morning_dose, evening_dose} = req.body;
        //const userinfo = req.body.id
        //const medDets = {med_name: med_name, duration: duration, morning_dose: morning_dose, evening_dose: evening_dose};

        patPres.findByIdAndUpdate(pres_id, { $pull: {medDetails: {_id: medet_id}}}, {new: true, useFindAndModify: false}, function (err, result) {
            if(err){
                console.log(err);
                return res.send(err);
             }
             return res.json({data: result});
        })
        /*
        .populate('userinfo', 'UID patient_name')
        .then(result => {

				console.log(result);
				res.json({
                    status: 'success',
					_id: result._id,
					userinfo: req.body.id,
					medDetails: result.medDetails,
				});
			}).catch(err => {
                res.status(500).send({
                  message: "Could not delete prescription details",
                  messg: err.message
                });
              });
        
        .then(data => {
            if (!data) {
            res.status(404).send({message: `Cannot delete prescription details with id=${medet_id}. Not Found`});
            } else {
            res.send({
            message: "prescription details was deleted successfully",
            result: data
            });
            }
        })
        */
        
        
    }

}