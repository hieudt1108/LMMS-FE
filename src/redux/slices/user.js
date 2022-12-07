import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { getAllUsers } from 'src/dataProvider/agent';

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  pagging: {},
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      console.log('hasError', action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET class
    getUserSuccess(state, action) {
      console.log('getUserSuccess: ', action);
      state.isLoading = false;
      state.users = action.payload.data.data;

      state.pagging = JSON.parse(action.payload.headers['x-pagination']);
    },
  },
});

// Reducer
export default slice.reducer;

//////
export function getUsersRedux(params) {
  return async () => {
    try {
      if (!params) {
        return dispatch(slice.actions.getUserSuccess([]));
      }
      dispatch(slice.actions.startLoading());
      const response = await getAllUsers(params);
      // console.log("test redux: ", )
      dispatch(slice.actions.getUserSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
