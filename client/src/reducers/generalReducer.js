import { FIND_TOKEN } from "../actions/constants";

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case FIND_TOKEN:
        return {
            ...state,
            findedDoctor: action.data
        };
        default:
        return state;
    }
}
