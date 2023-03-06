import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./CounterSlice";
import schoolsReducer from "./SchoolsSlice";
import authReducer from "./AuthSlice";
import citasReducer from "./CitasSlice"
export default configureStore({
  reducer: {
    counter: counterReducer,
    schools: schoolsReducer,
    auth: authReducer,
    citas:citasReducer
  },
});