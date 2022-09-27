import {
    LOAD_EMPLOYEES
} from "../actionTypes"
const initialState = {
data:[]
};

export const dashboardReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD_EMPLOYEES:
        return {
            ...state,
            data: action.payload
        }
        default:
            return state
    }
}