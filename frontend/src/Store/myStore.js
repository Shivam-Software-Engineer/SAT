import { configureStore } from "@reduxjs/toolkit";
import  loginSlice from "../Redux/loginSclice";



export const store = configureStore({
  reducer: {
    Login: loginSlice,
  },
})