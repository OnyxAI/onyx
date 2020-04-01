import produce from 'immer';
import authReducer from '../reducer';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  MANAGE_USER,
  MANAGE_USER_ERROR,
  MANAGE_USER_SUCCESS,
} from '../constants';
import { changeInput, updateUser } from '../actions';

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
      language: '',
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

  it('should handle the updateUser action correctly', () => {
    const user = {
      username: 'test',
      email: 'hello@test.fr',
      lastname: 'Test',
      firstname: 'Test',
      language: 'en-US',
    };

    const expectedResult = produce(state, draft => {
      draft.username = user.username;
      draft.email = user.email;
      draft.firstname = user.firstname;
      draft.lastname = user.lastname;
      draft.language = user.language;
    });

    expect(authReducer(state, updateUser(user))).toEqual(expectedResult);
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

  it('should handle the manageUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
    });

    const action = {
      type: MANAGE_USER,
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the registerUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
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

  it('should handle the manageUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = '';
      draft.verifPassword = '';
    });

    const action = {
      type: MANAGE_USER_SUCCESS,
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the manageUserError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.verifPassword = '';
    });

    const action = {
      type: MANAGE_USER_ERROR,
      error: 'An error has occured',
    };

    expect(authReducer(state, action)).toEqual(expectedResult);
  });
});
