import produce from 'immer';
import authReducer from '../reducer';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../constants';
import { changeInput } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('authReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      email: '',
      password: '',
      verifPassword: '',
      username: '',
      firstname: '',
      lastname: '',
      language: 'en-US',
      isRegistered: false,
      errorText: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(authReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeInput action correctly', () => {
    const input = 'email';
    const fixture = 'test@test.fr';
    const expectedResult = produce(state, draft => {
      draft.email = fixture;
    });

    expect(authReducer(state, changeInput(input, fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loginUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
      draft.email = '';
      draft.password = '';
    });

    const action = {
      type: LOGIN_USER_SUCCESS,
      accessToken: '123456',
      refreshToken: '789012',
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the loginUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
    });

    const action = {
      type: LOGIN_USER_ERROR,
      error: 'An error has occured',
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
    });

    const action = {
      type: REGISTER_USER,
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
      draft.isRegistered = true;
      draft.username = '';
      draft.language = '';
      draft.firstname = '';
      draft.lastname = '';
      draft.password = '';
      draft.verifPassword = '';
    });

    const action = {
      type: REGISTER_USER_SUCCESS,
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.password = '';
      draft.verifPassword = '';
      draft.errorText = 'An error has occured';
    });

    const action = {
      type: REGISTER_USER_ERROR,
      error: 'An error has occured',
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });
});
