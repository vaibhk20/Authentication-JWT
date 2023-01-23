import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import userActions from "./userActions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isLoggedIn: false,
  emailValidation: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userActions.signUp(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    return await userActions.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.response.data.messagetoString();
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const checkAuth = createAsyncThunk(
  "user/authorization",
  async (thunkAPI) => {
    try {
      const authResponse = await userActions.checkAuth();
      if (authResponse) return authResponse;
      else throw new Error("unauthorized");
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.response.data.messagetoString();
      // console.log(error.response.data)
      // toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const emailValidate = createAsyncThunk(
  "user/emailValidation",
  async (email, thunkAPI) => {
    try {
      const validationRes = await userActions.emailValidate(email);
      if (validationRes.data) return validationRes;
      else throw new Error("User doesn't exist");
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.response.data.messagetoString();
      console.log(error.response.data.message);
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const passwordResetRequest = createAsyncThunk(
  "user/passwordChange",
  async (user, thunkAPI) => {
    try {
      return await userActions.passwordReset(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.response.data.messagetoString();
      console.log(error.response.data.message);
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await userActions.logout();
  toast.success("User logged out");
});

export const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetValidation: (state) => {
      state.emailValidation = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(emailValidate.fulfilled, (state) => {
        state.emailValidation = true;
      })
      .addCase(emailValidate.rejected, (state) => {
        state.emailValidation = false;
      });
    // .addCase(passwordResetRequest.fulfilled, (state) => {
    //   state.emailValidation = false;
    // })
    // .addCase(passwordResetRequest.rejected, (state) => {
    //   state.emailValidation = false;
    // });
  },
});

export const { reset, resetValidation } = userSlice.actions;
export default userSlice.reducer;
