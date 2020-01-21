import produce from 'immer';
import { ADD_TOAST, REMOVE_TOAST } from './constants';

export const initialState = {
  toasts: [],
};

/* eslint-disable default-case, no-param-reassign */
const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_TOAST:
        draft.toasts = [action.payload, ...state.toasts];
        break;
      case REMOVE_TOAST:
        draft.toasts = state.toasts.filter(
          toast => toast.id !== action.payload,
        );
        break;
    }
  });

export default globalReducer;
