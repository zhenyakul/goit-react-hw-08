import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContactsData,
  addContactData,
  deleteContactData,
} from "./contactsOps";
import { userLogOut } from "../auth/usersOps";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsData.fulfilled, (state, action) => {
        state.error = null;
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContactsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContactData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContactData.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContactData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContactData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        const delIndex = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.contacts.splice(delIndex, 1);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.contacts = [];
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
