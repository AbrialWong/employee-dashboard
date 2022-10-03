import {
    LOAD_EMPLOYEES,
    SELECT_EMPLOYEE,
    DELETE_EMPLOYEE
} from "../actionTypes"
const initialState = {
    data:[],
    selected:{},
    deleted:{}

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
            case DELETE_EMPLOYEE:
                return {
                    ...state,
                    deleted: action.payload
                }

        default:
            return state
    }
}