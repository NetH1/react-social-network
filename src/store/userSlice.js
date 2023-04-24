import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const authUser = createAsyncThunk(
  "user/authUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${endpoint}/users?login=${login}&password=${password}`
      );

      if (!response.ok) {
        throw new Error("Server error!");
      }

      const data = await response.json();

      if (data.length < 1) {
        throw new Error("There is no such user :(");
      }

      return data[0];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const RegistrateUser = createAsyncThunk(
  'user/RegistrateUser',
  async(formData, {rejectWithValue}) => {
    try {
      const res = await fetch(
        `${endpoint}/users`,
        {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify(formData)
        }
      )
      if(!res.ok){
        throw new Error('server bad')
    }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user:null,
    isLoading: false,
    error: null,
  },
  reducers: {
    dismissError(state) {
      state.error = null;
    },
    logOut(state) {
      state.user = null;
    },
    changeUser(state, action) {
      state.user.name = action.payload;
    },
  },
  extraReducers: {
    [authUser.pending]: (state) => {
      state.isLoading = true;
    },
    [authUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [authUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },

    [RegistrateUser.pending]: (state) =>{
      state.isLoading = true;
    },
    [RegistrateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null
    },
    [RegistrateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    }
  },
});

export const { auth, logOut, dismissError } = UserSlice.actions;

export default UserSlice;
