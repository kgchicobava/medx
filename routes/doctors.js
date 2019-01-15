const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");
const mongoose = require("mongoose");
const omitEmpty = require("omit-empty");
const chartConfig = require("../config/charts");
const statsHelpers = require("../client/src/helpers/statsHelpers");

const validateRegisterInput = require("../validation/registerValidation");

router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body.userdata);
	console.log(errors, isValid);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Doctor.findOne({ email: req.body.userdata.email }).then(doc => {
		if (doc) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const newDoctor = new Doctor({
				firstName: req.body.userdata.firstName,
				lastName: req.body.userdata.lastName,
				email: req.body.userdata.email,
				password: req.body.userdata.password,
				typeOfUser: req.body.userdata.typeOfUser,
				color: req.body.userdata.color,
				settings: {},
				appointments: {
					monday: [],
					tuesday: [],
					wednesday: [],
					thursday: [],
					friday: []
				}
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
		}
	})
	.catch(err => console.log(err));
});

router.post(
	"/tokens",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findById(req.body.id, (err, doctor) => {
			if (err) console.log(err);
			console.log(doctor);
		});
		Doctor.findByIdAndUpdate(
			req.body.id,
			{
				$push: {
					tokens: req.body.token
				}
			},
			{
				new: true,
				upsert: true
			},
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
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findById(req.params.id)
			.then(doc => {
				let monData = doc.patients.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				Patient.find(
					{
						_id: {
							$in: monData
						}
					},
					(err, patients) => {
						if (err) console.log(err);
						res.send(patients);
					}
				);
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
		Doctor.findById(req.params.id)
			.then(doc => {
				if (doc) {
					res.send(doc.settings);
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
		Doctor.findById(user)
			.then(doc => {
				if (doc) {
					doc.settings = settings;
					doc.save();
					console.log("saved");
				}
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
		Doctor.findById(req.params.id).then(doc => {
			if (doc) {
				res.send(doc.appointments);
			} else res.send("doc not found");
		});
	}
);

router.post(
	"/rating",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { doctorID, stars } = req.body;
		console.log(doctorID, stars);
		Doctor.findById(doctorID)
			.then(doc => {
				if (doc) {
					doc.stars.push(stars);
					doc.save();
				}
			})
			.catch(err => console.log(err));
	}
);

router.post(
	"/appointments/add",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { doctorID, patientID, appointment, day } = req.body;
		// Doctor.updateOne({_id: doctorID}, {$set : {appointments}}, (err) => console.log(err));
		Doctor.findById(doctorID)
			.then(doc => {
				if (doc) {
					let tempApps = doc.appointments;
					tempApps[day].push(appointment);
					doc.appointments = null;
					doc.appointments = tempApps;
					doc.save();

					Patient.findById(patientID).then(patient => {
						if (patient) {
							appointment.name = `Dr. ${doc.firstName} ${
								doc.lastName
							}, ${
								doc.settings.cabinet
									? `cab. #${doc.settings.cabinet}`
									: ""
							}`;
							let tempApps = patient.appointments;
							tempApps[day].push(appointment);
							patient.appointments = null;
							patient.appointments = tempApps;
							patient.save();
						}
					});
				}
			})
			.catch(err => console.log(err));
	}
);

router.get(
	"/stats/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const {
			quantity,
			sexesPie,
			sexesBar,
			business,
			satisfaction,
			monthlyVisitors
		} = chartConfig;
		let sexesPieMen = 0,
			sexesPieWomen = 0;
		Doctor.findById(req.params.id)
			.then(doc => {
				// ============== quantity ===============
				quantity.options.labels[0] = doc.patients.length;
				// ============== quantity ===============

				// ==============monthly visits ==========
				monthlyVisitors.options.labels[0] = statsHelpers.getAppointmentsLength(
					doc.appointments
				);
				// ==============monthly visits ==========

				// ==============business=================
				business.series = statsHelpers.getVisitsData(doc.appointments);
				// ==============business=================

				// =================Satisfaction =========
				satisfaction.series = statsHelpers.countInArray(doc.stars);
				// =================Satisfaction =========

				let mongooseData = doc.patients.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				Patient.find(
					{ _id: { $in: mongooseData } },
					(err, patients) => {
						if (err) console.log(err);
						// ============== ages ===================
						sexesBar.series = statsHelpers.getAgesData(patients);
						// ============== ages ===================
						patients.forEach(patient => {
							if (patient.settings) {
								switch (patient.settings.sex) {
									case "male":
										sexesPieMen++;
										break;
									case "female":
										sexesPieWomen++;
										break;
									default:
										break;
								}
							}
						});
						// ============== sexesPie ====================
						sexesPie.series[0] = sexesPieMen;
						sexesPie.series[1] = sexesPieWomen;
						// ============== sexesPie ====================
						res.send({
							quantity,
							sexesPie,
							sexesBar,
							business,
							satisfaction,
							monthlyVisitors
						});
					}
				);
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;

// appointments.monday.push({name: "Not working", time_start: "07:00", time_end: schedule.monday.fromMonday});
//         appointments.monday.push({name: "Not working", time_start: `${schedule.monday.toMonday}`, time_end: "19:00"});

//         appointments.tuesday.push({name: "Not working", time_start: "07:00", time_end: schedule.tuesday.fromTuesday});
//         appointments.tuesday.push({name: "Not working", time_start: `${schedule.tuesday.toTuesday}`, time_end: "19:00"});

//         appointments.wednesday.push({name: "Not working", time_start: "07:00", time_end: schedule.wednesday.fromWednesday});
//         appointments.wednesday.push({name: "Not working", time_start: `${schedule.wednesday.toWednesday}`, time_end: "19:00"});

//         appointments.thursday.push({name: "Not working", time_start: "07:00", time_end: schedule.thursday.fromThursday});
//         appointments.thursday.push({name: "Not working", time_start: `${schedule.thursday.toThursday}`, time_end: "19:00"});

//         appointments.friday.push({name: "Not working", time_start: "07:00", time_end: schedule.friday.fromFriday});
//         appointments.friday.push({name: "Not working", time_start: `${schedule.friday.toFriday}`, time_end: "19:00"});
