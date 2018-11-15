import { SET_PATIENT, SET_DOCTOR, LOGOUT, GET_ERRORS } from "./constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../helpers/setAuthToken";

export const registerDoctor = (userdata, history) => dispatch => {
  console.log(history);
  axios
    .post("/api/doctors/register", { userdata })
    .then(res => {
      history.push("/login");
    })
    .catch(err => console.log(err));
};

export const registerPatient = (userdata, history) => dispatch => {
  axios
    .post("/api/patients/register", { userdata })
    .then(res => {
      history.push("/login");
    })
    .catch(err => console.log(err));
};

export const loginUser = userdata => dispatch => {
  axios
    .post("/api/user/login", { userdata })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
                 data: err.message
         })});
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  switch (decoded.typeOfUser) {
    case "Doctor":
      return {
        type: SET_DOCTOR,
        data: decoded
      };
    case "Patient":
      return {
        type: SET_PATIENT,
        data: decoded
      };
    default:
      return {
        type: LOGOUT,
        data: {}
      };
  }
};
