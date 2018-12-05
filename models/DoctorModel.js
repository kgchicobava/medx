const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
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
        tokens : {
            type: [String],
            default: []
        },
        patients : {
            type: Schema.Types.ObjectId,
            ref: "patients"
        }
});

module.exports = Doctor = mongoose.model("Doctor", DoctorSchema);