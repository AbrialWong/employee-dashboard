import {
    LOAD_EMPLOYEES,
    SELECT_EMPLOYEE
} from "../actionTypes"
const initialState = {
    data:[],
    selected:{}
};

export const dashboardReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD_EMPLOYEES:
        return {
            ...state,
            data: action.payload
        }
        case SELECT_EMPLOYEE:
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state
    }
}