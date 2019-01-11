import { APPOINTMENT_ADD, GET_APPOINTMENTS } from "./constants";
import axios from "axios";

export const getAppointments = (doctorID) => dispatch => {
    axios.get(`/api/doctors/appointments/${doctorID}`)
        .then(res => {
            dispatch({type: GET_APPOINTMENTS, data: res.data})
            // console.log(res.data);
        })
        .catch(err => console.log(err));
}

export const appointmentAdd = (appointment, day, doctorID ) => dispatch => {
    axios.post("/api/doctors/appointments/add", {doctorID, appointment, day})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    dispatch({type: APPOINTMENT_ADD, data: appointment, day});
}