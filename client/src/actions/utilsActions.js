import { FIND_TOKEN } from "./constants";
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
