const mongoose = require("mongoose");   
const Schema = mongoose.Schema;


const graphDets = new Schema ({

    Doctor : {
        type : String,
        required : true
    },
    UID: {
        type: String,
        required : true
    },
    Heart_rate: {
        type: Number,
        required : true
    },
    Blood_pressure: {
        type: Number,
        required : true
    },
    Cholesterol: {
        type: Number,
        required : true
    },
    Blood_sugar: {
        type: Number,
        required : true
    }
  }, {timestamps: true});

const graphDetails = mongoose.model('GraphDetails', graphDets);

module.exports = graphDetails;