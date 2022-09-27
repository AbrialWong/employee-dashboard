import {dashboardReducer} from "./dashboard";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    dashboard:dashboardReducer
})

export default allReducers