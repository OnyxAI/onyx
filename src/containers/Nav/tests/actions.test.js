import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  ADD_NAV,
  ADD_NAV_ERROR,
  ADD_NAV_SUCCESS,
  CHANGE_NAV_COLOR,
  CHANGE_NAV_ICON,
  CHANGE_NAV_URL,
  CHANGE_NAV_ON_MANAGE,
  REMOVE_NAV,
  REMOVE_NAV_ERROR,
  REMOVE_NAV_SUCCESS,
  GET_NAV,
  GET_NAV_ERROR,
  GET_NAV_SUCCESS,
} from '../constants';

import {
  addNav,
  addNavError,
  addNavSuccess,
  getNav,
  getNavError,
  getNavSuccess,
  changeNavUrl,
  changeNavColor,
  changeNavIcon,
  changeOnManage,
  removeNav,
  removeNavError,
  removeNavSuccess,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  isAuthenticated: false,
  isAuthenticating: true,
  userFetching: false,
  user: {},
  errorText: '',
});

describe('Auth Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('changeColor', () => {
    it('should return the correct type changeColor', () => {
      const expectedResult = {
        type: CHANGE_NAV_COLOR,
      };

      expect(changeNavColor()).toEqual(expectedResult);
    });
  });

  describe('changeUrl', () => {
    it('should return the correct type changeUrl', () => {
      const expectedResult = {
        type: CHANGE_NAV_URL,
      };

      expect(changeNavUrl()).toEqual(expectedResult);
    });
  });

  describe('changeIcon', () => {
    it('should return the correct type changeIcon', () => {
      const expectedResult = {
        type: CHANGE_NAV_ICON,
      };

      expect(changeNavIcon()).toEqual(expectedResult);
    });
  });

  describe('changeOnManage', () => {
    it('should return the correct type changeOnManage', () => {
      const expectedResult = {
        type: CHANGE_NAV_ON_MANAGE,
      };

      expect(changeOnManage()).toEqual(expectedResult);
    });
  });

  describe('addNav', () => {
    it('should return the correct type addNav', () => {
      const expectedResult = {
        type: ADD_NAV,
      };

      expect(addNav()).toEqual(expectedResult);
    });
  });

  describe('addNavSuccess', () => {
    it('should return the correct type and the passed addNavSuccess', () => {
      const expectedResult = {
        type: ADD_NAV_SUCCESS,
      };

      store.dispatch(addNavSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('addNavError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: ADD_NAV_ERROR,
        error,
      };

      expect(addNavError(error)).toEqual(expectedResult);
    });
  });

  describe('removeNav', () => {
    it('should return the correct type removeNav', () => {
      const expectedResult = {
        type: REMOVE_NAV,
      };

      expect(removeNav()).toEqual(expectedResult);
    });
  });

  describe('removeNavSuccess', () => {
    it('should return the correct type and the passed removeNavSuccess', () => {
      const expectedResult = {
        type: REMOVE_NAV_SUCCESS,
      };

      store.dispatch(removeNavSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('removeNavError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: REMOVE_NAV_ERROR,
        error,
      };

      expect(removeNavError(error)).toEqual(expectedResult);
    });
  });

  describe('getNav', () => {
    it('should return the correct type getNav', () => {
      const expectedResult = {
        type: GET_NAV,
      };

      expect(getNav()).toEqual(expectedResult);
    });
  });

  describe('getNavSuccess', () => {
    it('should return the correct type and the passed getNavSuccess', () => {
      const expectedResult = {
        type: GET_NAV_SUCCESS,
        nav: {},
      };

      expect(getNavSuccess({})).toEqual(expectedResult);
    });
  });

  describe('getNavError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_NAV_ERROR,
        error,
      };

      expect(getNavError(error)).toEqual(expectedResult);
    });
  });
});
