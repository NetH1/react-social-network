import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";
const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null

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
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(
        `${endpoint}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }
      )
      if (!res.ok) {
        throw new Error('server bad')
      }
      dispatch(authUser(formData))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const changeUser = createAsyncThunk(
  'user/changeUser',
  async ({formSettings, userId}, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(
        `${endpoint}/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formSettings)
        }
      )
      if (!res.ok) {
        throw new Error('server bad')
      }
      dispatch(authUser(formSettings))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: user,
    isLoading: false,
    error: null,
  },
  reducers: {
    dismissError(state) {
      state.error = null;
    },
    logOut(state) {
      state.user = null;
      localStorage.removeItem('user')
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
      localStorage.setItem('user', JSON.stringify(state.user))
    },



    [RegistrateUser.pending]: (state) => {
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
    },


    [changeUser.pending]: (state) => {
      state.isLoading = true
    },
    [changeUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [changeUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.removeItem('user', JSON.stringify(state.user))
      state.error = null
    }
  },
});

export const { auth, logOut, dismissError } = UserSlice.actions;

export default UserSlice;
