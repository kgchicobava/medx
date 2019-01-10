import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import generalReducer from "./generalReducer";
import calendarReducer from "./calendarReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    general: generalReducer,
    appointments: calendarReducer
});