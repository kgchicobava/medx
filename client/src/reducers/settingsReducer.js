import {
	GET_SETTINGS
} from "../actions/constants";

const initialState = {
	
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_SETTINGS:
			return action.data
		default:
			return state;
	}
};
