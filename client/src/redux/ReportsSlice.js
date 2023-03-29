import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    graphics: {},
  },
  reducers : {
    getDataGraphics: (state,action) => {
      state.graphics = action.payload
    },
  }
})

export const {getDataGraphics} = reportsSlice.actions

export default reportsSlice.reducer