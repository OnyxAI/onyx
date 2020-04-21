import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  CHANGE_COLOR,
  CHANGE_COLOR_ERROR,
  CHANGE_COLOR_SUCCESS,
  CHANGE_MODE,
  CHANGE_MODE_ERROR,
  CHANGE_MODE_SUCCESS,
} from '../constants';

import {
  changeColor,
  changeColorError,
  changeColorSuccess,
  changeMode,
  changeModeSuccess,
  changeModeError,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  color: '',
  mode: '',
});

describe('DesignSettings Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('changeColor', () => {
    it('should return the correct type and the passed color', () => {
      const fixture = 'blue';
      const expectedResult = {
        type: CHANGE_COLOR,
        color: fixture,
      };

      expect(changeColor(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed colorSuccess', () => {
      const expectedResult = {
        type: CHANGE_COLOR_SUCCESS,
      };

      store.dispatch(changeColorSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });

    it('should return the correct type and the passed colorError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: CHANGE_COLOR_ERROR,
        error: fixture,
      };

      expect(changeColorError(fixture)).toEqual(expectedResult);
    });
  });

  describe('changeMode', () => {
    it('should return the correct type and the passed mode', () => {
      const fixture = 'light';
      const expectedResult = {
        type: CHANGE_MODE,
        mode: fixture,
      };

      expect(changeMode(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed modeSuccess', () => {
      const expectedResult = {
        type: CHANGE_MODE_SUCCESS,
      };

      store.dispatch(changeModeSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });

    it('should return the correct type and the passed modeError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: CHANGE_MODE_ERROR,
        error: fixture,
      };

      expect(changeModeError(fixture)).toEqual(expectedResult);
    });
  });
});
