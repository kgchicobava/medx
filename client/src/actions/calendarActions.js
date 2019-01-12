import { APPOINTMENT_ADD, GET_APPOINTMENTS } from "./constants";
import axios from "axios";

export const getDoctorAppointments = (doctorID) => dispatch => {
    axios.get(`/api/doctors/appointments/${doctorID}`)
        .then(res => {
            dispatch({type: GET_APPOINTMENTS, data: res.data})
        })
        .catch(err => console.log(err));
}

export const getPatientAppointments = (patientID) => dispatch => {
    axios.get(`/api/patients/appointments/${patientID}`)
        .then(res => {
            console.log(res.data)
            dispatch({type: GET_APPOINTMENTS, data: res.data})
        })
        .catch(err => console.log(err));
}

export const appointmentAdd = (appointment, day, doctorID, patientID ) => dispatch => {
    axios.post("/api/doctors/appointments/add", {doctorID, patientID, appointment, day})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    dispatch({type: APPOINTMENT_ADD, data: appointment, day});
}