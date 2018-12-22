import { FIND_TOKEN, GET_PATIENTS_LIST, PATIENTS_LOADING } from "./constants";
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
        dispatch({type: FIND_TOKEN, data: res.data})
    })
    .catch(err => console.log(err));
};

export const merge = (doctor, patient) => dispatch => {
    console.log(`welcome from action`)
    console.log(doctor);
    console.log(patient);
    axios.post("/api/patients/merge", {doctor, patient})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

export const updatePatientSettings = (settings, user) => dispatch => {
    axios.post("/api/patients/updateSettings", {settings, user})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const updateDoctorSettings = (settings, user) => dispatch => {
    console.log(user)
    axios.post("/api/doctors/updateSettings", {settings, user})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const getPatientsList = (doctorID) => dispatch => {
    dispatch({type: PATIENTS_LOADING});
    axios.get(`/api/doctors/${doctorID}`)
        .then(res => {
            dispatch({type: GET_PATIENTS_LIST, data: res.data});
        })
        .catch(err => console.log(err))
}

export const setPatientsLoading = () => {
    return {
        type: PATIENTS_LOADING
    }
}