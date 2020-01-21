/*
 *
 * Auth reducer
 *
 */
import produce from 'immer';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_INPUT,
} from './constants';

export const initialState = {
  email: '',
  password: '',
  verifPassword: '',
  username: '',
  firstname: '',
  lastname: '',
  language: '',
  isRegistered: false,
  access_token: '',
  refresh_token: '',
  errorText: '',
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_INPUT:
        draft[action.input] = action.value;
        break;
      case LOGIN_USER_SUCCESS:
        draft.errorText = '';
        draft.email = '';
        draft.password = '';
        break;
      case LOGIN_USER_ERROR:
        draft.password = '';
        draft.errorText = action.error;
        break;
      case REGISTER_USER:
        draft.errorText = '';
        break;
      case REGISTER_USER_SUCCESS:
        draft.errorText = '';
        draft.isRegistered = true;
        draft.username = '';
        draft.language = '';
        draft.firstname = '';
        draft.lastname = '';
        draft.password = '';
        draft.verifPassword = '';
        break;
      case REGISTER_USER_ERROR:
        draft.errorText = action.error;
        draft.password = '';
        draft.verifPassword = '';
        break;
      default:
        break;
    }
  });

export default authReducer;
