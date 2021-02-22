const mongoose = require("mongoose");  
const Schema = mongoose.Schema;
const shortid = require('shortid');
const { ObjectId } = mongoose.Schema.Types;

const doctorSchema = new Schema({

    UID: {
        type: String,
        default: shortid.generate,
      },

    doctor_name: {
        type: String,
        required: true,
    },

    doctor_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        sparse: true
    },

    password: {
        type: String,
        required: true
    },

    doctor_phone_no: {
        type: String,
        required: true
    },

    degree: {
        type: String,
        required: true,
    },

    specialisation: {
        type: String,
        required: true
    },

    type_work: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }
});


  const docs = mongoose.model('doctors', doctorSchema);

  module.exports = docs;

