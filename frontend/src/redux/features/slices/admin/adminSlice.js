import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminDetails: {},
    adminToken: "",
    notifications: [],
  },
  reducers: {
    adminLogin: (state, action) => {
      state.adminDetails = action.payload.admin;
      state.adminToken = action.payload.token;
    },
    updateAdminData : (state,action) =>{
      state.adminDetails = action.payload.admin;
    },
    logoutAdmin : (state,action) =>{
      state.adminDetails = {};
      state.adminToken = "";
    }
  },
});

export const { adminLogin, updateAdminData,logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
