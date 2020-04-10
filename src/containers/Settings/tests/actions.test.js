import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getOnyxData, getOnyxDataSuccess, getOnyxDataError } from '../actions';
import {
  GET_ONYX_DATA,
  GET_ONYX_DATA_SUCCESS,
  GET_ONYX_DATA_ERROR,
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  loadingData: false,
  language: 'en',
});

describe('Settings Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe(' getOnyxData', () => {
    it('should return the correct type getOnyxData', () => {
      const expectedResult = {
        type: GET_ONYX_DATA,
      };

      expect(getOnyxData()).toEqual(expectedResult);
    });
  });

  describe('getOnyxDataSuccess', () => {
    it('should return the correct type and the passed getOnyxDataSuccess', () => {
      const expectedResult = {
        type: GET_ONYX_DATA_SUCCESS,
      };

      store.dispatch(getOnyxDataSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getOnyxDataError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_ONYX_DATA_ERROR,
        error,
      };

      store.dispatch(getOnyxDataError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });
});
