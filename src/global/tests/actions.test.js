import Toast, {
  addToast,
  removeToast,
  globalError,
  reloadApi,
} from '../actions';

import {
  ADD_TOAST,
  REMOVE_TOAST,
  GLOBAL_ERROR,
  RELOAD_API,
} from '../constants';

describe('Global actions', () => {
  describe('Toasts action', () => {
    it('should dispatch adding info toast', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 0,
          color: '#1e88e5',
          duration: 5000,
        },
      };
      expect(Toast.info({})).toEqual(expected);
    });

    it('should dispatch adding error toast', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 1,
          color: '#e53935',
          duration: 5000,
        },
      };
      expect(Toast.error({})).toEqual(expected);
    });

    it('should dispatch adding error toast', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 2,
          color: '#43a047',
          duration: 5000,
        },
      };
      expect(Toast.success({})).toEqual(expected);
    });

    it('should dispatch adding toast', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 3,
          color: '#ffffff',
          duration: 5000,
        },
      };
      expect(addToast({ color: '#ffffff' })).toEqual(expected);
    });

    it('should dispatch adding toast without options', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 4,
          color: '#1e88e5',
          duration: 5000,
        },
      };
      expect(addToast()).toEqual(expected);
    });

    it('should dispatch removing toast', () => {
      const expected = {
        type: REMOVE_TOAST,
        payload: 1,
      };
      expect(removeToast(1)).toEqual(expected);
    });
  });

  it('should dispatch global Error', () => {
    const expected = {
      type: GLOBAL_ERROR,
      error: 'error',
    };
    expect(globalError('error')).toEqual(expected);
  });

  it('should dispatch reload Api', () => {
    const expected = {
      type: RELOAD_API,
    };
    expect(reloadApi()).toEqual(expected);
  });
});
