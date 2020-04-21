import globalReducer from '../reducer';
import { ADD_TOAST, REMOVE_TOAST, GLOBAL_ERROR } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('globalReducer', () => {
  it('returns the initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({
      errorText: '',
      toasts: [],
    });
  });

  it('should add a global error', () => {
    expect(
      globalReducer(undefined, {
        type: GLOBAL_ERROR,
        error: 'error',
      }),
    ).toEqual({
      toasts: [],
      errorText: 'error',
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
      errorText: '',
    });
  });

  it('remove a toast which do not exist', () => {
    expect(
      globalReducer(undefined, {
        type: REMOVE_TOAST,
        payload: 1,
      }),
    ).toEqual({
      toasts: [],
      errorText: '',
    });
  });

  it('remove a toast', () => {
    const state = {
      toasts: [
        {
          id: 1,
        },
      ],
    };
    expect(
      globalReducer(state, {
        type: REMOVE_TOAST,
        payload: 1,
      }),
    ).toEqual({
      toasts: [],
    });
  });
});
