import {
	MONDAY_ADD,
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

		case MONDAY_ADD:
			state.monday.push({
				name: action.data.name,
				time_start: action.data.time,
				time_end: getEndTime(action.data.time)
			});
			return { ...state };


		default:
			return state;
	}
};
