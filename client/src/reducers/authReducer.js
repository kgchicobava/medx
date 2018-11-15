import { SET_DOCTOR, SET_PATIENT, LOGOUT } from "../actions/constants";
import isEmpty from "../helpers/isempty";
const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DOCTOR:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.data),
            user: action.data
        }
        case SET_PATIENT:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.data),
            user: action.data
        };
        case LOGOUT:
        return {
            ...state,
            isAuthenticated: false,
        }
        default:
        return state;
    }
}