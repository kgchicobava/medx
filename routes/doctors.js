const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Doctor = require("../models/DoctorModel");

router.post("/register", (req, res) => {
    const newDoctor = new Doctor({
        firstName : req.body.userdata.firstName,
        lastName : req.body.userdata.lastName,
        email : req.body.userdata.email,
        password : req.body.userdata.password,
        typeOfUser: req.body.userdata.typeOfUser
    });
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newDoctor.password, salt, (err, hash) => {
            if(err) throw err;
            newDoctor.password = hash;
            newDoctor
                .save()
                .then(doctor => res.json(doctor))
                .catch(err => console.log(err));
        });
    });
});

router.post("/tokens", passport.authenticate("jwt", {session : false }), (req, res) => {
    Doctor.findById(req.body.id, (err, doctor) => {if(err) console.log(err);
    console.log(doctor)});
    Doctor.findByIdAndUpdate(req.body.id, {$push: {tokens: req.body.token}}, {new: true, upsert: true}, (err, doctor) => {
        if(err) console.log(err);
        console.log(doctor);
    })
    // req.body.token
});


module.exports = router;