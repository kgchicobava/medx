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
            type: [String]
        },
        patients : [{
            patient : {
                type: Schema.Types.ObjectId,
                ref: "patients"
            }
        }],
	    created: {
        	type: Date,
        	default: Date.now
        },
        settings: {
            type: Schema.Types.Mixed,
        },
        color: {
            type: String
        },
        appointments: {
            type: Schema.Types.Mixed
        }
});

module.exports = Doctor = mongoose.model("Doctor", DoctorSchema);