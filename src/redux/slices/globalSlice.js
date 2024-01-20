import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API from "../url";

const cookies = new Cookies();

const initialState = {
  loading: false,
  SignupMsg: null,
  error: null,
  RegEmail: null,

  VerifyRegTokenMailMsg: null,

  loginLoading: false,
  LoginMsg: null,
  LoginAuth: false,
  LoginToken: null,

  ForgLoading: false,
  ForgPassMsg: null,
  ForgPassMsgMail: null,

  TokenMsgPassLoading: false,
  TokenMsgPassUpdate: null,
  TokenEmailPassUpdate: null,

  resetPassLoading: false,
  resetPassMsg: null,
};

export const signupdata = createAsyncThunk("auth/signupdata", async (body) => {
  try {
    const response = await axios.post(API + "/register", body);
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error;
  }
});

export const VerifySignupToken = createAsyncThunk(
  "auth/VerifySignupToken",
  async (body) => {
    try {
      const response = await axios.post(API + "/verifyEmailTokenSignup", body);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);

export const authuser = createAsyncThunk("auth/authuser", async (body) => {
  try {
    const response = await axios.post(API + "/authenticate", body);
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error;
  }
});

export const forgotpass = createAsyncThunk("auth/forgotpass", async (body) => {
  try {
    const response = await axios.post(API + "/forgot-password", body);
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error;
  }
});

export const VerifyTokenForPass = createAsyncThunk(
  "auth/VerifyTokenForPass",
  async (body) => {
    try {
      const response = await axios.post(API + "/VerifyTokenforpass", body);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);

export const resetpassw = createAsyncThunk(
  "auth/resetpassword",
  async (body) => {
    try {
      const response = await axios.post(API + "/resetpassword", body);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    clearSignupMsg: (state) => {
      state.loading = false;
      state.SignupMsg = null;
    },

    clearLoginMsg: (state) => {
      state.loginLoading = false;
      state.LoginMsg = null;
    },
    logoutusernow: (state) => {
      state.LoginMsg = null;
      state.LoginAuth = false;
      state.LoginToken = null;
    },

    clearForgotpassMsg: (state) => {
      state.ForgLoading = false;
      state.ForgPassMsg = null;
    },

    clearVerifyTokenMsg: (state) => {
      state.TokenMsgPassLoading = false;
      state.TokenMsgPassUpdate = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupdata.pending, (state) => {
        state.loading = true;
      })

      .addCase(signupdata.fulfilled, (state, action) => {
        state.loading = false;
        state.SignupMsg = action.payload.msg;
        state.RegEmail = action.payload.curruser;
      })
      .addCase(signupdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) //////////////////////////////////////////////////////////////////////
      .addCase(VerifySignupToken.fulfilled, (state, action) => {
        console.log("Verify fulfilled", action.payload.msg);
        state.loading = false;
        state.VerifyRegTokenMailMsg = action.payload.msg;
        // state.RegEmail = action.payload.curruser;
      })
      .addCase(VerifySignupToken.rejected, (state, action) => {
        console.log("Verify rejected", action.payload.msg);
        state.loading = false;
        state.VerifyRegTokenMailMsg = action.payload.msg;
        // state.RegEmail = action.payload.curruser;
      }) //////////////////////////////////////////////////////////////////////////////
      .addCase(authuser.pending, (state) => {
        console.log("pending auth");
        state.loginLoading = true;
      })
      .addCase(authuser.fulfilled, (state, action) => {
        state.loginLoading = false;

        if (action.payload.token) {
          // localStorage.setItem("jwtToken", action.payload.jwtToken);
          cookies.set("jwtToken", action.payload.token);

          console.log(cookies.get("jwtToken"));
          state.LoginAuth = action.payload.auth;
          state.LoginToken = action.payload.token;
          state.LoginMsg = action.payload.msg;
        } else {
          state.LoginAuth = action.payload.auth;
          state.LoginToken = action.payload.token;
          state.LoginMsg = action.payload.msg;
        }
      })
      .addCase(authuser.rejected, (state, action) => {
        state.loginLoading = false;
      })
      /////////////////////////////////////////////////////////////////////////
      .addCase(forgotpass.pending, (state) => {
        state.ForgLoading = true;
      })

      .addCase(forgotpass.fulfilled, (state, action) => {
        state.ForgLoading = false;
        console.log("action.payloa for ForgotPass", action.payload);
        state.ForgPassMsg = action.payload.msg;
        state.ForgPassMsgMail = action.payload.user;
      })
      .addCase(forgotpass.rejected, (state, action) => {
        state.loading = false;
      })
      /////////////////////////////////////////////////////////////////////////
      .addCase(VerifyTokenForPass.pending, (state) => {
        state.TokenMsgPassLoading = true;
      })

      .addCase(VerifyTokenForPass.fulfilled, (state, action) => {
        state.TokenMsgPassLoading = false;
        console.log("VerifyTokenForPass", action.payload);

        state.TokenMsgPassUpdate = action.payload.msg;
        state.TokenEmailPassUpdate = action.payload.email;
      })
      .addCase(VerifyTokenForPass.rejected, (state, action) => {
        state.TokenMsgPassLoading = false;
      }) //////////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////
      .addCase(resetpassw.pending, (state) => {
        state.resetPassLoading = true;
      })
      .addCase(resetpassw.fulfilled, (state, action) => {
        state.resetPassLoading = false;
        state.resetPassMsg = action.payload.msg;
      })
      .addCase(resetpassw.rejected, (state, action) => {
        state.resetPassLoading = false;
      }); //////////////////////////////////////////////////////////////////////
  },
});

export const {
  clearSignupMsg,
  clearLoginMsg,
  logoutusernow,
  clearForgotpassMsg,
  clearVerifyTokenMsg,
} = globalSlice.actions;

export const selectCurrentUser = (state) => state.global.user;
