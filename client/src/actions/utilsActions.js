// import { SET_TOKEN } from "./constants";
import axios from "axios";
export const setToken = (token, id) => dispatch => {
    axios.post("/api/doctors/tokens", {token, id})
        .then(res => console.log(res))
        .catch(err => console.log(err));
}