/*
 *
 * Install reducer
 *
 */
import produce from 'immer';
import {
  GET_INSTALL_ERROR,
  GET_INSTALL_SUCCESS,
  GET_INSTALL,
  INSTALL_ONYX_SUCCESS,
  INSTALL_ONYX_ERROR,
  CHANGE_INPUT,
  CHANGE_STEP,
  ACCOUNT_ERROR,
} from './constants';

export const initialState = {
  step: 1,
  email: '',
  password: '',
  verifPassword: '',
  username: '',
  firstname: '',
  lastname: '',
  language: '',
  errorText: '',
  loading: false,
  isInstalled: false,
};

/* eslint-disable default-case, no-param-reassign */
const installReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACCOUNT_ERROR:
        draft.errorText = action.error;
        break;
      case CHANGE_STEP:
        draft.step = action.step;
        break;
      case CHANGE_INPUT:
        draft[action.input] = action.value;
        break;
      case GET_INSTALL:
        draft.loading = true;
        break;
      case GET_INSTALL_SUCCESS:
        draft.loading = false;
        draft.isInstalled = action.isInstalled;
        break;
      case GET_INSTALL_ERROR:
        draft.loading = false;
        draft.errorText = action.error;
        break;
      case INSTALL_ONYX_SUCCESS:
        draft.isInstalled = true;
        draft.loading = false;
        break;
      case INSTALL_ONYX_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default installReducer;
