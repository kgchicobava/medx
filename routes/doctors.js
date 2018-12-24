const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");
const mongoose = require("mongoose");
const omitEmpty = require('omit-empty');

router.post("/register", (req, res) => {
  const newDoctor = new Doctor({
    firstName: req.body.userdata.firstName,
    lastName: req.body.userdata.lastName,
    email: req.body.userdata.email,
    password: req.body.userdata.password,
    typeOfUser: req.body.userdata.typeOfUser,
    color: req.body.userdata.color,
    settings: {}
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newDoctor.password, salt, (err, hash) => {
      if (err) throw err;
      newDoctor.password = hash;
      newDoctor
        .save()
        .then(doctor => res.json(doctor))
        .catch(err => console.log(err));
    });
  });
});

router.post(
  "/tokens",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.findById(req.body.id, (err, doctor) => {
      if (err) console.log(err);
      console.log(doctor);
    });
    Doctor.findByIdAndUpdate(
      req.body.id,
      { $push: { tokens: req.body.token } },
      { new: true, upsert: true },
      (err, doctor) => {
        if (err) console.log(err);
        console.log(doctor);
      }
    );
    // req.body.token
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.findById(req.params.id)
      .then(doc => {
        let monData = doc.patients.map(
          elem => new mongoose.Types.ObjectId(elem._id)
        );
        Patient.find({ _id: { $in: monData } }, (err, patients) => {
          if (err) console.log(err);
          res.send(patients);
        });
      })
      .catch(err => console.log(err));
  }
);

router.post("/updateSettings", passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const {settings, user} = req.body;
    Doctor.updateOne({_id: user}, {$set : {settings: omitEmpty(settings)}}, (err) => console.log(err));
  });


module.exports = router;

// let arr = _categories.map(ele => new mongoose.Types.ObjectId(ele.id));

// model.find({
//     '_id': { $in: [
//         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
//         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
//         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
//     ]}
// }, function(err, docs){
//      console.log(docs);
//
