const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");

router.post("/register", (req, res) => {
  const newPatient = new Patient({
    firstName: req.body.userdata.firstName,
    lastName: req.body.userdata.lastName,
    email: req.body.userdata.email,
    password: req.body.userdata.password,
    typeOfUser: req.body.userdata.typeOfUser
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPatient.password, salt, (err, hash) => {
      if (err) throw err;
      newPatient.password = hash;
      newPatient
        .save()
        .then(patient => res.json(patient))
        .catch(err => console.log(err));
    });
  });
});

router.post(
  "/adddoctor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.findOne({ tokens: req.body.token }, (err, doctor) => {
      if (err) console.log(err);
      if (doctor) {
        res.send(doctor);
      } else {
        console.log("no such item");
      }
    });
  }
);

router.post(
  "/merge",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { doctor, patient } = req.body;
    Patient.findById(patient.id)
      .then(patient => {
          if(patient) {
            patient.doctors.push(doctor._id);
            patient.save().then(patient => res.json(patient));
          }
      })
      .catch(err => console.log(err));

    Doctor.findById(doctor._id)
        .then(doc => {
            if(doc) {
                doc.patients.push(patient.id);
                doc.save();
            }
        })
        .catch(err => console.log(err));

    }
);

router.post("/updateSettings", passport.authenticate("jwt", {session: false}), 
  (req, res) => {
    console.log(req.body);
  })

module.exports = router;
