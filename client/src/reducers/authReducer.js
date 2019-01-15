import { SET_DOCTOR, SET_PATIENT, LOGOUT } from "../actions/constants";
import isEmpty from "../helpers/isempty";

const initialState = {
	isPatientAuthenticated: false,
	isDoctorAuthenticated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_DOCTOR:
			return {
				...state,
				isDoctorAuthenticated: !isEmpty(action.data),
				user: action.data
			};
		case SET_PATIENT:
			return {
				...state,
				isPatientAuthenticated: !isEmpty(action.data),
				user: action.data
			};
		case LOGOUT:
			return {
				...state,
				isPatientAuthenticated: false,
				isDoctorAuthenticated: false
			};
		default:
			return state;
	}
}
