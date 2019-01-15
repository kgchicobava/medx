const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");
const mongoose = require("mongoose");

router.post("/register", (req, res) => {
	const newPatient = new Patient({
		firstName: req.body.userdata.firstName,
		lastName: req.body.userdata.lastName,
		email: req.body.userdata.email,
		password: req.body.userdata.password,
		typeOfUser: req.body.userdata.typeOfUser,
		color: req.body.userdata.color,
		settings: {}
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
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findOne(
			{
				tokens: req.body.token
			},
			(err, doctor) => {
				if (err) console.log(err);
				if (doctor) {
					res.send(doctor);
				} else {
					console.log("no such item");
				}
			}
		);
	}
);

router.post(
	"/merge",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { doctor, patient } = req.body;
		Patient.findById(patient.id)
			.then(patient => {
				if (patient) {
					patient.doctors.push(doctor._id);
					patient.save().then(patient => res.json(patient));
				}
			})
			.catch(err => console.log(err));

		Doctor.findById(doctor._id)
			.then(doc => {
				if (doc) {
					doc.patients.push(patient.id);
					doc.save();
				}
			})
			.catch(err => console.log(err));
	}
);

router.post(
	"/updateSettings",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { settings, user } = req.body;
		Patient.findById(user)
			.then(patient => {
				if (patient) {
					patient.settings = settings;
					patient.save();
					console.log("saved");
				}
			})
			.catch(err => console.log(err));
	}
);

router.get(
	"/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				let monData = patient.doctors.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				Doctor.find(
					{
						_id: {
							$in: monData
						}
					},
					(err, doctors) => {
						if (err) console.log(err);
						res.send(doctors);
					}
				);
			})
			.catch(err => console.log(err));
	}
);

router.post(
	"/setdiaryrecord",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { record, patientID } = req.body;
		Patient.findById(patientID).then(patient => {
			if (patient) {
				patient.diary.push(record);
				patient.save();
				console.log("saved");
			}
		});
	}
);

router.get(
	"/records/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.diary);
				}
			})
			.catch(err => console.log(err));
	}
);

router.get(
	"/getSettings/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.settings);
				}
			})
			.catch(err => console.log(err));
	}
);

router.post(
	"/setrecepie",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { recepie, patientID } = req.body;
		Patient.findById(patientID).then(patient => {
			if (patient) {
				patient.recepies.push(recepie);
				patient.save();
				console.log("saved");
			}
		});
	}
);

router.get(
	"/recepies/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id).then(patient => {
			if (patient) {
				res.send(patient.recepies);
			}
		});
	}
);

router.post(
	"/unsubscribe",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { patientID, doctorID } = req.body;
		Patient.findById(patientID)
			.then(patient => {
				for (let i = 0; i < patient.doctors.length; i++) {
					if (
						patient.doctors[i]._id.toString() ===
						doctorID.toString()
					) {
						patient.doctors.splice(i, 1);
					}
                }

				patient.save();
			})
			.catch(err => console.log(err));

            Doctor.findById(doctorID)
			.then(doc => {
				for (let i = 0; i < doc.patients.length; i++) {
					if (
						doc.patients[i]._id.toString() ===
						patientID.toString()
					) {
						doc.patients.splice(i, 1);
					}
				}
				doc.save();
			})
			.catch(err => console.log(err));
	}

);

router.get(
	"/appointments/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.appointments);
				}
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;
