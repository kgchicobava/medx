import {
	FIND_TOKEN,
	GET_PATIENTS_LIST,
	PATIENTS_LOADING,
	GET_DOCTORS_LIST,
	DOCTORS_LOADING,
	GET_PATIENT_RECORD,
	GET_PATIENT_RECEPIE
} from "./constants";
import axios from "axios";

export const setToken = (token, id) => dispatch => {
	axios
		.post("/api/doctors/tokens", { token, id })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const findToken = token => dispatch => {
	axios
		.post("/api/patients/adddoctor", { token })
		.then(res => {
			dispatch({ type: FIND_TOKEN, data: res.data });
		})
		.catch(err => console.log(err));
};

export const merge = (doctor, patient) => dispatch => {
	axios
		.post("/api/patients/merge", { doctor, patient })
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
};

export const updatePatientSettings = (settings, user) => dispatch => {
	axios
		.post("/api/patients/updateSettings", { settings, user })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const updateDoctorSettings = (settings, user) => dispatch => {
	axios
		.post("/api/doctors/updateSettings", { settings, user })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const getPatientsList = doctorID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
	axios
		.get(`/api/doctors/${doctorID}`)
		.then(res => {
			dispatch({ type: GET_PATIENTS_LIST, data: res.data });
		})
		.catch(err => console.log(err));
};

export const getDoctorsList = patientId => dispatch => {
	dispatch({ type: DOCTORS_LOADING });
	axios
		.get(`/api/patients/${patientId}`)
		.then(res => {
			dispatch({ type: GET_DOCTORS_LIST, data: res.data });
		})
		.catch(err => console.log(err));
};

export const sendDiaryRecord = (record, patientID) => dispatch => {
	axios
		.post("/api/patients/setdiaryrecord", { record, patientID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const getPatientsRecords = patientID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
    axios.get(`/api/patients/records/${patientID}`)
        .then(res => {
		dispatch({ type: GET_PATIENT_RECORD, data: res.data });
    })
      .catch(err => console.log(err));
};

export const sendRecepie = (recepie, patientID) => dispatch => {
	axios
		.post("/api/patients/setrecepie", { recepie, patientID })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const getPatientsRecepies = patientID => dispatch => {
	dispatch({ type: PATIENTS_LOADING });
    axios.get(`/api/patients/recepies/${patientID}`)
        .then(res => {
		dispatch({ type: GET_PATIENT_RECEPIE, data: res.data });
    })
      .catch(err => console.log(err));
};


export const setPatientsLoading = () => {
	return {
		type: PATIENTS_LOADING
	};
};

export const setDoctorsLoading = () => {
	return {
		type: DOCTORS_LOADING
	};
};
