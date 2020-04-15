import produce from 'immer';
import installReducer from '../reducer';
import {
  getInstall,
  getInstallError,
  getInstallSuccess,
  changeStep,
  changeInput,
  accountError,
} from '../actions';

import { INSTALL_ONYX_SUCCESS, INSTALL_ONYX_ERROR } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('installReducer', () => {
  let state;
  beforeEach(() => {
    state = {
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
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(installReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeInput action correctly', () => {
    const input = 'email';
    const fixture = 'test@test.fr';
    const expectedResult = produce(state, draft => {
      draft.email = fixture;
    });

    expect(installReducer(state, changeInput(input, fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeStep action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.step = 1;
    });

    expect(installReducer(state, changeStep(1))).toEqual(expectedResult);
  });

  it('should handle the accountError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'error';
    });

    expect(installReducer(state, accountError('error'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getInstall action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
    });

    expect(installReducer(state, getInstall())).toEqual(expectedResult);
  });

  it('should handle the getInstallSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.isInstalled = true;
    });

    expect(installReducer(state, getInstallSuccess(true))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getInstallError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loading = false;
    });

    expect(
      installReducer(state, getInstallError('An error has occured')),
    ).toEqual(expectedResult);
  });

  it('should handle the installOnyxSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.isInstalled = true;
    });

    const action = {
      type: INSTALL_ONYX_SUCCESS,
    };

    expect(installReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the installOnyxError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'error';
    });

    const action = {
      type: INSTALL_ONYX_ERROR,
      error: 'error',
    };

    expect(installReducer(state, action)).toEqual(expectedResult);
  });
});
