import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
} from '../constants';

import {
  refreshToken,
  refreshTokenError,
  refreshTokenSuccess,
  verifyToken,
  verifyTokenError,
  verifyTokenSuccess,
  logoutUser,
  logoutUserError,
  logoutUserSuccess,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  isAuthenticated: false,
  isAuthenticating: true,
  user: {},
  errorText: '',
  language: 'en',
});

describe('Route Actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('refreshToken', () => {
    it('should return the correct type refreshToken', () => {
      const expectedResult = {
        type: REFRESH_TOKEN,
      };

      expect(refreshToken()).toEqual(expectedResult);
    });
  });

  describe('refreshTokenSuccess', () => {
    it('should return the correct type refreshTokenSuccess', () => {
      const expectedResult = {
        type: REFRESH_TOKEN_SUCCESS,
      };

      expect(refreshTokenSuccess()).toEqual(expectedResult);
    });
  });

  describe('refreshTokenError', () => {
    it('should return the correct type refreshTokenError', () => {
      const expectedResult = {
        type: REFRESH_TOKEN_ERROR,
        error: 'error',
      };

      expect(refreshTokenError('error')).toEqual(expectedResult);
    });
  });

  describe('verifyToken', () => {
    it('should return the correct type verifyToken', () => {
      const expectedResult = {
        type: VERIFY_TOKEN,
      };

      expect(verifyToken()).toEqual(expectedResult);
    });
  });

  describe('verifyTokenSuccess', () => {
    it('should return the correct type verifyTokenSuccess', () => {
      const expectedResult = {
        type: VERIFY_TOKEN_SUCCESS,
      };

      expect(verifyTokenSuccess()).toEqual(expectedResult);
    });
  });

  describe('verifyTokenError', () => {
    it('should return the correct type verifyTokenError', () => {
      const expectedResult = {
        type: VERIFY_TOKEN_ERROR,
        error: 'error',
      };

      expect(verifyTokenError('error')).toEqual(expectedResult);
    });
  });

  describe('logoutUser', () => {
    it('should return the correct type logoutUser', () => {
      const expectedResult = {
        type: LOGOUT_USER,
      };

      expect(logoutUser()).toEqual(expectedResult);
    });
  });

  describe('logoutUserSuccess', () => {
    it('should return the correct type and the passed logoutUserSuccess', () => {
      const expectedResult = {
        type: LOGOUT_USER_SUCCESS,
      };

      store.dispatch(logoutUserSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });

  describe('logoutUserError', () => {
    it('should return the correct type and the passed logoutUserError', () => {
      const expectedResult = {
        type: LOGOUT_USER_ERROR,
        error: 'error',
      };

      store.dispatch(logoutUserError('error'));

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });
});
