import globalReducer from '../reducer';
import { ADD_TOAST, REMOVE_TOAST } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('globalReducer', () => {
  it('returns the initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({
      toasts: [],
    });
  });

  it('add a toast', () => {
    expect(
      globalReducer(undefined, {
        type: ADD_TOAST,
        payload: {},
      }),
    ).toEqual({
      toasts: [{}],
    });
  });

  it('remove a toast', () => {
    expect(
      globalReducer(undefined, {
        type: REMOVE_TOAST,
        payload: 1,
      }),
    ).toEqual({
      toasts: [],
    });
  });
});
