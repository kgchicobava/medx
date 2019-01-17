import { APPOINTMENT_ADD, GET_APPOINTMENTS } from "../actions/constants";

const initialState = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.data;

		case APPOINTMENT_ADD:
			state[action.day].push(action.data.appointment);
			return { ...state };

		default:
			return state;
	}
};
