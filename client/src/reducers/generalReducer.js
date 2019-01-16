import {
	FIND_TOKEN,
	GET_PATIENTS_LIST,
	PATIENTS_LOADING,
	GET_DOCTORS_LIST,
	DOCTORS_LOADING,
	GET_PATIENT_RECORD,
	GET_PATIENT_RECEPIE,
	CLEAR_FINDED_DOCTOR
} from "../actions/constants";

const initialState = {
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FIND_TOKEN:
			return {
				...state,
				findedDoctor: action.data,
				loading: false
			};

		case CLEAR_FINDED_DOCTOR:
			return {
				...state,
				findedDoctor: "",
				loading: false
			};

		case GET_PATIENTS_LIST:
			return {
				...state,
				loading: false,
				patientData: action.data
			};

		case PATIENTS_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_DOCTORS_LIST:
			return {
				...state,
				loading: false,
				doctorData: action.data
			};

		case GET_PATIENT_RECORD:
			return {
				...state,
				loading: false,
				patientRecords: action.data
			};

		case GET_PATIENT_RECEPIE:
			return {
				...state,
				loading: false,
				patientRecepie: action.data
			};

		case DOCTORS_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
}
