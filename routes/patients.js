const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Patient = require("../models/PatientModel");

router.post("/register", (req, res) => {
    const newPatient = new Patient({
        firstName : req.body.userdata.firstName,
        lastName : req.body.userdata.lastName,
        email : req.body.userdata.email,
        password : req.body.userdata.password,
        typeOfUser: req.body.userdata.typeOfUser
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if(err) throw err;
            newPatient.password = hash;
            newPatient
                .save()
                .then(patient => res.json(patient))
                .catch(err => console.log(err));
        })
    })
});


module.exports = router;