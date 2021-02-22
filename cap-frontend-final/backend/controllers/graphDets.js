const graphDets = require("../models/GraphDetails")


module.exports = {

    
    createGraph : async (req, res) => {

        try {
            console.log(req.body);
            //const userinfo = req.body.id
    //i am seeing but cant talk manually
          var newData = new graphDets(req.body)
    
          const savedpatDets = await newData.save();
            res.json({message: 'patient Graph Details saved successfully', result: savedpatDets})
            }catch (err) {
                res.status(400).json({
                    status: 'fail',
                    message: err.message
                })
            }
        },
        getPatGraph : async(req, res) => {

            const id = req.params.id
            const graphDet = await graphDets.find({UID : id})
            if(graphDet){
            res.status(200).json({
                    status: 'success',
                    results: graphDet.length,
                    data: graphDet
            })}else{
                res.json("Error fetching data")
            }
    
        }

    }

