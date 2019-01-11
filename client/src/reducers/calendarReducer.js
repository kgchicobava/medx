import {
	APPOINTMENT_ADD,
	GET_APPOINTMENTS,
} from "../actions/constants";
import getEndTime from "../helpers/getEndTime";

const initialState = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.data

		case APPOINTMENT_ADD:
			state[action.day].push(action.appointment);
			return { ...state };


		default:
			return state;
	}
};
