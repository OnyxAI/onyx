import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  CHANGE_INPUT,
} from '../constants';

import {
  loginUser,
  loginUserError,
  loginUserSuccess,
  registerUser,
  registerUserError,
  registerUserSuccess,
  changeInput,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  email: '',
  password: '',
  verifPassword: '',
  username: '',
  firstname: '',
  lastname: '',
  language: 'en',
  isRegistered: false,
  errorText: '',
});

describe('Login Actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('changeInput', () => {
    it('should return the correct type changeInput', () => {
      const input = 'email';
      const value = 'test@test.fr';
      const expectedResult = {
        type: CHANGE_INPUT,
        input,
        value,
      };

      expect(changeInput(input, value)).toEqual(expectedResult);
    });
  });

  describe('loginUser', () => {
    it('should return the correct type loginUser', () => {
      const expectedResult = {
        type: LOGIN_USER,
      };

      expect(loginUser()).toEqual(expectedResult);
    });
  });

  describe('loginUserSuccess', () => {
    it('should return the correct type and the passed loginUserSuccess', () => {
      const access = '123456';
      const refresh = '123456';

      const expectedResult = {
        type: LOGIN_USER_SUCCESS,
        accessToken: access,
        refreshToken: refresh,
      };

      store.dispatch(loginUserSuccess(access, refresh));

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });

  describe('loginUserError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: LOGIN_USER_ERROR,
        error,
      };

      store.dispatch(loginUserError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });

  describe('registerUser', () => {
    it('should return the correct type registerUser', () => {
      const expectedResult = {
        type: REGISTER_USER,
      };

      expect(registerUser()).toEqual(expectedResult);
    });
  });

  describe('registerUserSuccess', () => {
    it('should return the correct type and the passed registerUserSuccess', () => {
      const expectedResult = {
        type: REGISTER_USER_SUCCESS,
      };

      store.dispatch(registerUserSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual(
        '@@router/CALL_HISTORY_METHOD',
      );
      expect(store.getActions()[2].type).toEqual('onyx/global/ADD_TOAST');
    });
  });

  describe('registerUserError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: REGISTER_USER_ERROR,
        error,
      };

      store.dispatch(registerUserError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });
});
