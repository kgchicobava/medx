import { MONDAY_ADD, GET_APPOINTMENTS } from "./constants";
import axios from "axios";

export const getAppointments = (doctorID) => dispatch => {
    axios.get(`/api/doctors/appointments/${doctorID}`)
        .then(res => {
            dispatch({type: GET_APPOINTMENTS, data: res.data})
            // console.log(res.data);
        })
        .catch(err => console.log(err));
}

export const mondayAdd = (name, time, doctorID, appointments) => dispatch => {
    axios.post("/api/doctors/appointments/add", {doctorID, appointments})
    dispatch({type: MONDAY_ADD, data: {name, time}});
}