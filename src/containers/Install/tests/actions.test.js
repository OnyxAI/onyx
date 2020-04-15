import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_INSTALL,
  GET_INSTALL_ERROR,
  GET_INSTALL_SUCCESS,
  INSTALL_ONYX,
  INSTALL_ONYX_ERROR,
  INSTALL_ONYX_SUCCESS,
  CHANGE_INPUT,
  CHANGE_STEP,
  ACCOUNT_ERROR,
} from '../constants';

import {
  getInstall,
  getInstallError,
  getInstallSuccess,
  installOnyx,
  installOnyxError,
  installOnyxSuccess,
  changeStep,
  changeInput,
  accountError,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
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
});

describe('Install Actions', () => {
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

  describe('changeStep', () => {
    it('should return the correct type changeStep', () => {
      const expectedResult = {
        type: CHANGE_STEP,
        step: 1,
      };

      expect(changeStep(1)).toEqual(expectedResult);
    });
  });

  describe('accountError', () => {
    it('should return the correct type accountError', () => {
      const expectedResult = {
        type: ACCOUNT_ERROR,
        error: 'error',
      };

      expect(accountError('error')).toEqual(expectedResult);
    });
  });

  describe('getInstall', () => {
    it('should return the correct type and the passed getInstall', () => {
      const expectedResult = {
        type: GET_INSTALL,
      };

      expect(getInstall()).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getInstallSuccess', () => {
      const fixture = true;
      const expectedResult = {
        type: GET_INSTALL_SUCCESS,
        isInstalled: fixture,
      };

      expect(getInstallSuccess(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getInstallError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: GET_INSTALL_ERROR,
        error: fixture,
      };

      expect(getInstallError(fixture)).toEqual(expectedResult);
    });
  });

  describe('installOnyx', () => {
    it('should return the correct type and the passed installOnyx', () => {
      const expectedResult = {
        type: INSTALL_ONYX,
      };

      expect(installOnyx()).toEqual(expectedResult);
    });

    it('should return the correct type and the passed installOnyxSuccess', () => {
      const expectedResult = {
        type: INSTALL_ONYX_SUCCESS,
      };

      store.dispatch(installOnyxSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/Install/GET_INSTALL');
      expect(store.getActions()[2].type).toEqual('onyx/global/ADD_TOAST');
    });

    it('should return the correct type and the passed installOnyxError', () => {
      const expectedResult = {
        type: INSTALL_ONYX_ERROR,
      };

      store.dispatch(installOnyxError());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });
});
