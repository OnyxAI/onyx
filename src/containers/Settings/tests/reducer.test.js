import produce from 'immer';
import settingsReducer from '../reducer';
import { getOnyxData } from '../actions';
import { GET_ONYX_DATA_ERROR, GET_ONYX_DATA_SUCCESS } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('settingsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loadingData: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(settingsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getOnyxData action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingData = true;
    });

    expect(settingsReducer(state, getOnyxData())).toEqual(expectedResult);
  });

  it('should handle the getOnyxDataSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingData = false;
    });

    const action = {
      type: GET_ONYX_DATA_SUCCESS,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getOnyxDataError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingData = false;
    });

    const action = {
      type: GET_ONYX_DATA_ERROR,
      error: 'An error has occured',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });
});
