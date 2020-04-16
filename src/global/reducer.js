import produce from 'immer';
import { ADD_TOAST, REMOVE_TOAST, GLOBAL_ERROR } from './constants';

export const initialState = {
  toasts: [],
  errorText: '',
};

/* eslint-disable default-case, no-param-reassign */
const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GLOBAL_ERROR:
        draft.errorText = action.error;
        break;
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
