const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Patient = require("../models/PatientModel");
const Doctor = require("../models/DoctorModel");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
  const email = req.body.userdata.email;
  const password = req.body.userdata.password;
  let errors = {
    email: "",
    password: ""
  };

  Patient.findOne({ email }).then(patient => {
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
          errors.password = "Password incorrect";
          return res.json(errors);
        }
      });
    } else {
      Doctor.findOne({ email }).then(doctor => {
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
              errors.password = "Password incorrect";
              return res.json(errors);
            }
          });
        } else {
          errors.email = "User not found";
          return res.json(errors);
        }
      });
    }
  }).catch(err => console.log(err));
});

module.exports = router;
