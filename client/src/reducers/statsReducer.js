import { GET_STATS } from "../actions/constants";

const initialState = {

}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_STATS:
            return {
                ...state,
                quantity: action.data.quantity,
                sexesPie: action.data.sexesPie,
                sexesBar: action.data.sexesBar,
                business: action.data.business,
                satisfaction: action.data.satisfaction,
                monthlyVisitors: action.data.monthlyVisitors,
            }
        default:
            return state
    }
}