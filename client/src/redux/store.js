import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./CounterSlice";
import schoolsReducer from "./SchoolsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    schools: schoolsReducer
  },
});