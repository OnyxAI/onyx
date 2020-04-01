import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  CHANGE_COLOR,
  CHANGE_COLOR_ERROR,
  CHANGE_COLOR_SUCCESS,
} from '../constants';

import { changeColor, changeColorError, changeColorSuccess } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  color: '',
});

describe('DesignSettings Actions', () => {
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
});
