import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : "",
    isAuth: false ,
    user: null,
    oneSchool: null,
    success: null,
    error: "",
    loading: false,
    vacantes: [],
  },
  reducers : {
    getVacantes: (state,action) => {
      state.vacantes = action.payload
    },
    getSchool: (state,action) => {
      state.oneSchool = action.payload,
      state.loading = false,
      state.success = true,
      state.error = ""
    },
    getUser: (state,action) => {
      state.loading = false,
      state.success = true,
      state.isAuth = true,
      state.error = "",
      state.user = action.payload
    },
    registerUser: (state) => {
      state.loading = false,
      state.success = true
      state.error = ""
    },
    loginUser: (state,action) => {
      state.isAuth = true,
      state.loading = false,
      state.success = true,
      state.user = action.payload,
      state.error = ""  
      state.token = localStorage.getItem('token')
    },
    logoutUser: (state) => {
      state.isAuth = false,
      state.loading = false,
      state.success = null,
      state.user = null,
      state.error = "",
      state.oneSchool = null,
      state.token = ""
    },
    updateUser: (state,action) => {
      state.loading = false,
      state.success = true,
      state.user = action.payload,
      state.error = ""
    },
    getError: (state,action) => {
      state.error = action.payload,
      state.loading = false,
      state.success = false
    },
    isLoading: (state) => {
      state.loading = true
    }
  }
})

export const {getSchool,getUser,registerUser,loginUser,logoutUser,getError,isLoading,updateUser,getVacantes} = authSlice.actions

export default authSlice.reducer