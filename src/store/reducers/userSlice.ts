import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./actionCreator";

interface UserState {
  name: string;
  surname: string;
  email: string;
  id: string;
  isAuth: boolean;
  loading: boolean;
  errorLogin: null | string;
  errorRegistration: null | string;
  errorAuth:null |string;
  errorLogout: null |string;
  isActivated: boolean;
}

const initialState: UserState = {
  name: "",
  surname: "",
  email: "",
  id: "",
  isAuth: false,
  loading: false,
  errorLogin: null,
  errorRegistration:null,
  errorAuth:null,
  errorLogout:null,
  isActivated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      registration.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.isActivated = action.payload.isActivated;
        state.isAuth = true;
      }
    );
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
      state.errorRegistration = null;
    });
    builder.addCase(registration.rejected, (state, action: any) => {
      state.loading = false;
      if (action.payload) state.errorRegistration = action.payload;
    });

    // --------------------------------------------------------------------------------

    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isActivated = action.payload.isActivated;
      state.isAuth = true;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.errorLogin = null;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.loading = false;
      if (action.payload) state.errorLogin = action.payload;
    });
    // --------------------------------------------------------------------------------

    builder.addCase(
      checkAuth.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.isActivated = action.payload.isActivated;
        state.isAuth = true;
      }
    );
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.errorAuth = null;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.errorAuth = "error";
    });

    // --------------------------------------------------------------------------------
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.errorLogout = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.errorLogout = "error";
    });
  },
});

export default userSlice.reducer;
