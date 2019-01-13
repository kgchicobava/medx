import axios from "axios";
import {
    GET_SETTINGS
} from "../actions/constants";

export const updatePatientSettings = (settings, user) => dispatch => {
    axios
        .post("/api/patients/updateSettings", {
            settings,
            user
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

export const updateDoctorSettings = (settings, user) => dispatch => {
	axios
		.post("/api/doctors/updateSettings", { settings, user })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const getPatientSettings = (patientID) => dispatch => {
    axios.get(`/api/patients/getSettings/${patientID}`)
        .then(res => dispatch({
            type: GET_SETTINGS,
            data: res.data
        }))
        .catch(err => console.log(err))
}

export const getDoctorSettings = (doctorID) => dispatch => {
    axios.get(`/api/doctors/getSettings/${doctorID}`)
        .then(res => dispatch({
            type: GET_SETTINGS,
            data: res.data
        }))
        .catch(err => console.log(err))
}