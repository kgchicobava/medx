import {
    FIND_TOKEN,
    GET_PATIENTS_LIST,
    PATIENTS_LOADING
} from "../actions/constants";

const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FIND_TOKEN:
            return {
                ...state,
                findedDoctor: action.data,
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
        default:
            return state;
    }
}