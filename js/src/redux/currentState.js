// State provides dynamic content
import * as types from './type';

export const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
