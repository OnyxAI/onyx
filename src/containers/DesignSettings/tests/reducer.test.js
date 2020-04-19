import produce from 'immer';
import designSettingsReducer from '../reducer';
import { changeColorError, changeColor } from '../actions';
import { CHANGE_COLOR_SUCCESS } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('designSettingsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      color: '',
      mode: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(designSettingsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeColor action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.color = 'blue';
    });

    expect(designSettingsReducer(state, changeColor('blue'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeColorSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.color = '';
    });

    const action = {
      type: CHANGE_COLOR_SUCCESS,
    };

    expect(designSettingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the changeColorError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.color = '';
    });

    expect(
      designSettingsReducer(state, changeColorError('An error has occured')),
    ).toEqual(expectedResult);
  });
});
