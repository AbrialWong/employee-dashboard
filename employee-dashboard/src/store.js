import { configureStore } from 'redux';
import dashboardReducer from "./reducers/dashboard";


export const store = configureStore({
    reducer:{
        dashboard: dashboardReducer,
    }
});
