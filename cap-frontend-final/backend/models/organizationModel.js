const mongoose = require("mongoose");   
const Schema = mongoose.Schema;
const shortid = require('shortid');


const organizationSchema = new Schema({

    UID: {
        type: String,
        default: shortid.generate,
      },

    org_name: {
        type: String,
        required: true,
    },

    org_email: {
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

    org_phone_no: {
        type: String,
        required: true
    },

    reg_no: {
        type: String,
        required: true,
    },

    reg_role: {
        type: String,
        required: true
    },

    org_head_addr: {
        type: String,
        required: true
    },

    reddrsl_no: {
        type: String,
        required: true
    }
});

  const orgs = mongoose.model('organizations', organizationSchema);

  module.exports = orgs;

