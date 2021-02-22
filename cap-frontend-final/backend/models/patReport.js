const mongoose = require("mongoose");   
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
//const patSchema = require('./patientModel').patientSchema;

const patRepUpl = new Schema ({

    patDetails: {
        type: ObjectId,
        ref: 'patients'
    },

    report: {
        type: Object,
        default: 'no file'
    },

    reportpath: String
}, {timestamps: true});

module.exports = mongoose.model('uploads', patRepUpl);