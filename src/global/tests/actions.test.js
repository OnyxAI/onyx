import { addToast, removeToast } from '../actions';

import { ADD_TOAST, REMOVE_TOAST } from '../constants';

describe('Global actions', () => {
  describe('Add toast Action', () => {
    it('should dispatch adding toast', () => {
      const expected = {
        type: ADD_TOAST,
        payload: {
          id: 0,
          color: '#1e88e5',
          duration: 5000,
        },
      };
      expect(addToast({})).toEqual(expected);
    });

    it('should dispatch removing toast', () => {
      const expected = {
        type: REMOVE_TOAST,
        payload: 1,
      };
      expect(removeToast(1)).toEqual(expected);
    });
  });
});
