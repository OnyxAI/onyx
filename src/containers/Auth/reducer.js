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
  UPDATE_USER,
  MANAGE_USER_SUCCESS,
  MANAGE_USER_ERROR,
  MANAGE_USER,
} from './constants';

export const initialState = {
  email: '',
  password: '',
  verifPassword: '',
  username: '',
  firstname: '',
  lastname: '',
  language: '',
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
      case UPDATE_USER:
        draft.username = action.user.username;
        draft.email = action.user.email;
        draft.firstname = action.user.firstname;
        draft.lastname = action.user.lastname;
        draft.language = action.user.language;
        break;
      case MANAGE_USER:
        draft.errorText = '';
        break;
      case MANAGE_USER_SUCCESS:
        draft.errorText = '';
        draft.verifPassword = '';
        break;
      case MANAGE_USER_ERROR:
        draft.verifPassword = '';
        draft.errorText = action.error;
        break;
      default:
        break;
    }
  });

export default authReducer;
