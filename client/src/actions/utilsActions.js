import {
	FIND_TOKEN,
	GET_PATIENTS_LIST,
	PATIENTS_LOADING,
	GET_DOCTORS_LIST,
	DOCTORS_LOADING,
	GET_PATIENT_RECORD,
	GET_PATIENT_RECEPIE,
	CLEAR_FINDED_DOCTOR,
	GET_STATS
} from "./constants";
import axios from "axios";

// Clear finded doctor in searchtoken dialog
export const clearFinded = () => dispatch => {
	dispatch({ type: CLEAR_FINDED_DOCTOR });
};

// Set generated token for doctor
export const setToken = (token, id) => dispatch => {
	axios
		.post("/api/doctors/tokens", { token, id })
		.then(res => res.json())
		.catch(err => console.log(err));
};

// Find generated token
export const findToken = token => dispatch => {
	axios
		.post("/api/patients/adddoctor", { token })
		.then(res => {
			dispatch({ type: FIND_TOKEN, data: res.data });
		})
		.catch(err => console.log(err));
};

// If token finded, merge patient and doctor
export const merge = (doctor, patient) => dispatch => {
	axios
		.post("/api/patients/merge", { doctor, patient })
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
};

// Get patients list for doctor
export const getPatientsList = doctorID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
	axios
		.get(`/api/doctors/${doctorID}`)
		.then(res => {
			dispatch({ type: GET_PATIENTS_LIST, data: res.data });
		})
		.catch(err => console.log(err));
};

// Get doctors list for patient
export const getDoctorsList = patientId => dispatch => {
	dispatch({ type: DOCTORS_LOADING });
	axios
		.get(`/api/patients/${patientId}`)
		.then(res => {
			dispatch({ type: GET_DOCTORS_LIST, data: res.data });
		})
		.catch(err => console.log(err));
};

// Set diary record to patient`s db
export const sendDiaryRecord = (record, patientID) => dispatch => {
	axios
		.post("/api/patients/setdiaryrecord", { record, patientID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Get patient`s records in diary
export const getPatientsRecords = patientID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
	axios
		.get(`/api/patients/records/${patientID}`)
		.then(res => {
			dispatch({ type: GET_PATIENT_RECORD, data: res.data });
		})
		.catch(err => console.log(err));
};

// Set recepie record to patient`s db
export const sendRecepie = (recepie, patientID) => dispatch => {
	axios
		.post("/api/patients/setrecepie", { recepie, patientID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Get patient`s recepies
export const getPatientsRecepies = patientID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
	axios
		.get(`/api/patients/recepies/${patientID}`)
		.then(res => {
			dispatch({ type: GET_PATIENT_RECEPIE, data: res.data });
		})
		.catch(err => console.log(err));
};

// Set rating star value for doctor
export const setRating = (stars, doctorID) => {
	axios
		.post("/api/doctors/rating", { stars, doctorID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Unsubscribe from doctor
export const unsubscribeFromDoctor = (patientID, doctorID) => {
	axios
		.post("/api/patients/unsubscribe", { patientID, doctorID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

// Get stats data for charts
export const getStats = doctorID => dispatch => {
	axios
		.get(`/api/doctors/stats/${doctorID}`)
		.then(res => {
			dispatch({ type: GET_STATS, data: res.data });
		})
		.catch(err => console.log(err));
};

// Helper
export const setPatientsLoading = () => {
	return {
		type: PATIENTS_LOADING
	};
};

// Helper
export const setDoctorsLoading = () => {
	return {
		type: DOCTORS_LOADING
	};
};
