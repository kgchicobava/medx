const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Patient = require("../models/PatientModel");
const Doctor = require("../models/DoctorModel");
const bcrypt = require("bcryptjs");
const validateLoginInput = require('../validation/loginValdation');

router.post("/login", (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body.userdata);
    console.log(errors, isValid);
    const {
        email,
        password
    } = req.body.userdata;
    if (!isValid) {
        return res.status(400).json(errors);
    }


Patient.findOne({
    email
}).then(patient => {
    if (patient) {
        bcrypt.compare(password, patient.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: patient.id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    typeOfUser: "Patient"
                }; // Create JWT Payload
                // Sign Token
                jwt.sign(payload, keys.secretKey, (err, token) => {
                    if (err) console.log(err);
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
                console.log(`User matched!`);
            } else {
                console.log(`Password incorrect`)
                errors.password = 'Password incorrect';
                return res.status(404).json(errors);
            }
        });
    } else {
        Doctor.findOne({
            email
        }).then(doctor => {
            if (!doctor) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            if (doctor) {
                bcrypt.compare(password, doctor.password).then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        const payload = {
                            id: doctor.id,
                            firstName: doctor.firstName,
                            lastName: doctor.lastName,
                            typeOfUser: "Doctor"
                        }; // Create JWT Payload
                        // Sign Token
                        jwt.sign(payload, keys.secretKey, (err, token) => {
                            if (err) console.log(err);
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                        console.log(`User matched!`);
                    } else {
                        console.log("Password incorrect")
                        errors.password = 'Password incorrect';
                        return res.status(404).json(errors);
                    }
                });
            } else {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
        });
    } 
}).catch(err => console.log(err));
});

module.exports = router;