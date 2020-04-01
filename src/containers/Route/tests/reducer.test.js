import produce from 'immer';
import currentUserReducer from '../reducer';
import { LOGOUT_USER_ERROR, LOGOUT_USER_SUCCESS } from '../constants';

import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from '../../Auth/constants';

import { registerUser, loginUser } from '../../Auth/actions';

import {
  refreshToken,
  refreshTokenSuccess,
  refreshTokenError,
  verifyTokenSuccess,
  verifyTokenError,
  verifyToken,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('currentUserReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: {},
      errorText: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(currentUserReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the refreshToken action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
      draft.isAuthenticating = true;
      draft.errorText = '';
    });

    expect(currentUserReducer(state, refreshToken())).toEqual(expectedResult);
  });

  it('should handle the refreshTokenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
      draft.isAuthenticating = false;
      draft.errorText = 'error';
      draft.user = {};
    });

    expect(currentUserReducer(state, refreshTokenError('error'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the refreshTokenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = true;
      draft.isAuthenticating = false;
      draft.errorText = '';
    });

    expect(currentUserReducer(state, refreshTokenSuccess('123456'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the verifyToken action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
      draft.isAuthenticating = true;
      draft.errorText = '';
    });

    expect(currentUserReducer(state, verifyToken())).toEqual(expectedResult);
  });

  it('should handle the verifyTokenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
      draft.isAuthenticating = false;
      draft.errorText = 'error';
      draft.user = {};
    });

    expect(currentUserReducer(state, verifyTokenError('error'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the verifyTokenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = true;
      draft.isAuthenticating = false;
      draft.errorText = '';
      draft.user = {};
    });

    expect(currentUserReducer(state, verifyTokenSuccess({}))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loginUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticating = true;
      draft.isAuthenticated = false;
    });

    expect(currentUserReducer(state, loginUser())).toEqual(expectedResult);
  });

  it('should handle the registerUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
    });

    expect(currentUserReducer(state, registerUser())).toEqual(expectedResult);
  });

  it('should handle the logoutUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
      draft.errorText = '';
    });

    const action = {
      type: LOGOUT_USER_SUCCESS,
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the logoutUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'error';
    });

    const action = {
      type: LOGOUT_USER_ERROR,
      error: 'error',
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the loginUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticating = false;
      draft.isAuthenticated = true;
      draft.errorText = '';
    });

    const action = {
      type: LOGIN_USER_SUCCESS,
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the loginUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticating = false;
      draft.isAuthenticated = false;
      draft.errorText = 'error';
    });

    const action = {
      type: LOGIN_USER_ERROR,
      error: 'error',
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
    });

    const action = {
      type: REGISTER_USER_SUCCESS,
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'error';
    });

    const action = {
      type: REGISTER_USER_ERROR,
      error: 'error',
    };

    expect(currentUserReducer(state, action)).toEqual(expectedResult);
  });
});
