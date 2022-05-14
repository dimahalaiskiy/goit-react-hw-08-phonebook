import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/contacts/';

export const fetchContacts = createAsyncThunk(
  'contacts/getContacts',
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await axios('contacts');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactFromServer = createAsyncThunk(
  'contacts/deleteContactFromServer',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      await axios.delete(`contacts/${id}`);
      dispatch(deleteContact(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContactToServer = createAsyncThunk(
  'contacts/addContactToServer',
  async function (contact, { rejectWithValue, dispatch }) {
    try {
      const contactData = {
        name: contact.name,
        number: contact.number,
      };
      const { data } = await axios.post('contacts', contactData);
      if (data) {
        const { id, name, number } = data;

        dispatch(addContact({ id, name, number }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    loading: 'idle',
    status: null,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      return {
        items: state.items.filter(contact => contact.id !== action.payload),
        filter: state.filter,
      };
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload;
      state.error = null;
    },
    [fetchContacts.rejected]: setError,
    [deleteContactFromServer.rejected]: setError,
    [addContactToServer.rejected]: setError,
  },
});

export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;

export default contactsSlice;
