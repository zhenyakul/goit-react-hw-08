import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthorizationHeader = (token) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

const deleteAuthorizationHeader = () =>
  (axios.defaults.headers.common["Authorization"] = "");

export const userRegister = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userData);
      setAuthorizationHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", userData);
      setAuthorizationHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogOut = createAsyncThunk(
  "auth/logout",
  async (userData, thunkAPI) => {
    try {
      await axios.post("/users/logout", userData);
      deleteAuthorizationHeader();
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthorizationHeader(reduxState.users.token);

      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const state = thunkAPI.getState();
      return state.users.token != null;
    },
  }
);
