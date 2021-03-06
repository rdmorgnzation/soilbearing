// Config provides static content
// Refresh page to change
import * as types from './type';

export const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONFIG:
      return action.payload.value;
    default:
      return state;
  }
};
