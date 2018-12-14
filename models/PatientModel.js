const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    typeOfUser: {
        type: String
    },
    doctors: [{
        doctor : {
            type: Schema.Types.ObjectId,
            ref: "doctors"
    }}],
    settings: {
        type: Schema.Types.Mixed,
    }
});

module.exports = Patient = mongoose.model("Patient", PatientSchema);