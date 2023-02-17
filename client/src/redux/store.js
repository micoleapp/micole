import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./CounterSlice";
import schoolsReducer from "./SchoolsSlice";
import authReducer from "./AuthSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    schools: schoolsReducer,
    auth: authReducer
  },
});