/*
 *
 * Neurons reducer
 *
 */
import produce from 'immer';
import {
  GET_ONYX_DATA_ERROR,
  GET_ONYX_DATA_SUCCESS,
  GET_ONYX_DATA,
} from './constants';

export const initialState = {
  errorText: '',
  loadingData: false,
  downloaded: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ONYX_DATA:
        draft.downloaded = false;
        draft.loadingData = true;
        break;
      case GET_ONYX_DATA_SUCCESS:
        draft.downloaded = true;
        draft.loadingData = false;
        break;
      case GET_ONYX_DATA_ERROR:
        draft.downloaded = false;
        draft.loadingData = false;
        draft.errorText = action.error;
        break;
    }
  });

export default settingsReducer;
