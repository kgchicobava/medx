import { SET_TOKEN } from "../actions/constants";

const initialState = {};

export default function(state = initialState, action) {
    switch(action) {
        case SET_TOKEN:
        return {

        };
        default:
        return state;
    }
}
