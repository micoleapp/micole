import { createSlice } from "@reduxjs/toolkit";

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    allschools: [],
    oneSchool: {},
    error: "",
    loading: false
  },
  reducers : {
    getSchools: (state,action) => {
      state.allschools = action.payload,
      state.loading = false,
      state.error = ""
    },
    getOneSchool: (state,action) => {
      state.oneSchool = action.payload,
      state.loading = false,
      state.error = ""
    },
    getError: (state,action) => {
      state.error = action.payload,
      state.loading = false
    },
    isLoading: (state,action) => {
      state.loading = action.payload
    }
  }
})

export const {getSchools,getOneSchool,getError,isLoading} = schoolsSlice.actions

export default schoolsSlice.reducer