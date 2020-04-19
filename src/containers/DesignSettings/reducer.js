/*
 *
 * DesignSettings reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_COLOR,
  CHANGE_COLOR_ERROR,
  CHANGE_COLOR_SUCCESS,
  CHANGE_MODE,
  CHANGE_MODE_ERROR,
  CHANGE_MODE_SUCCESS,
} from './constants';

export const initialState = {
  errorText: '',
  color: '',
  mode: '',
};

/* eslint-disable default-case, no-param-reassign */
const designSettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_COLOR:
        draft.color = action.color;
        break;
      case CHANGE_COLOR_SUCCESS:
        draft.color = '';
        break;
      case CHANGE_COLOR_ERROR:
        draft.color = '';
        draft.errorText = action.error;
        break;
      case CHANGE_MODE:
        draft.mode = action.mode;
        break;
      case CHANGE_MODE_SUCCESS:
        draft.mode = '';
        break;
      case CHANGE_MODE_ERROR:
        draft.mode = '';
        draft.errorText = action.error;
        break;
    }
  });

export default designSettingsReducer;
