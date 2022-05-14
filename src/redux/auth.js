import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const registerUser = createAsyncThunk(
  'auth/signup',
  async (credential, { dispatch }) => {
    try {
      const { data } = await axios.post('users/signup', credential);
      token.set(data.token);
      dispatch();
    } catch (error) {
      throw new Error('Sorry, we cant register you, server error.');
    }
  }
);

const logInUser = createAsyncThunk('auth/login', async credential => {
  try {
    const { data } = await axios.post('users/login', credential);
    token.set(data.token);
    return data;
  } catch (error) {
    throw new Error('Sorry, we cant logged In you, server error.');
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    const { data } = await axios.post('users/logout');
    token.unset();
    return data;
  } catch (error) {
    throw new Error('Sorry, we cant unlogged In you, server error.');
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    console.log(persistedToken);
    if (persistedToken === null) {
      return;
    }

    token.set(persistedToken);

    try {
      const { data } = await axios.get('users/current');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authOperations = { registerUser, logInUser, logOut, fetchCurrentUser };

export default authOperations;
