import produce from 'immer';
import {
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
} from './constants';

import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
} from '../Auth/constants';

export const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  user: {},
  errorText: '',
};

/* eslint-disable default-case, no-param-reassign */
const currentUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case VERIFY_TOKEN:
        draft.isAuthenticated = false;
        draft.isAuthenticating = true;
        draft.errorText = '';
        break;
      case VERIFY_TOKEN_SUCCESS:
        draft.isAuthenticating = false;
        draft.isAuthenticated = true;
        draft.errorText = '';
        draft.user = action.user;
        break;
      case VERIFY_TOKEN_ERROR:
        draft.isAuthenticating = false;
        draft.isAuthenticated = false;
        draft.errorText = action.error;
        draft.user = {};
        break;
      case REFRESH_TOKEN:
        draft.isAuthenticated = false;
        draft.isAuthenticating = true;
        draft.errorText = '';
        break;
      case REFRESH_TOKEN_SUCCESS:
        draft.isAuthenticated = true;
        draft.isAuthenticating = false;
        draft.errorText = '';
        draft.user = action.user;
        break;
      case REFRESH_TOKEN_ERROR:
        draft.isAuthenticated = false;
        draft.isAuthenticating = false;
        draft.errorText = action.error;
        draft.user = {};
        break;
      case LOGIN_USER:
        draft.isAuthenticating = true;
        draft.isAuthenticated = false;
        break;
      case LOGIN_USER_SUCCESS:
        draft.isAuthenticating = false;
        draft.isAuthenticated = true;
        draft.errorText = '';
        break;
      case LOGIN_USER_ERROR:
        draft.isAuthenticating = false;
        draft.isAuthenticated = false;
        draft.errorText = action.error;
        break;
      case REGISTER_USER:
        draft.errorText = '';
        break;
      case REGISTER_USER_SUCCESS:
        draft.errorText = '';
        draft.isRegistered = true;
        break;
      case REGISTER_USER_ERROR:
        draft.errorText = action.error;
        break;
      case LOGOUT_USER_SUCCESS:
        draft.isAuthenticated = false;
        draft.errorText = '';
        break;
      case LOGOUT_USER_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default currentUserReducer;
