/*
 *
 * Settings reducer
 *
 */
import produce from 'immer';
import {
  GET_ONYX_DATA_ERROR,
  GET_ONYX_DATA_SUCCESS,
  GET_ONYX_DATA,
  GET_TOKENS,
  GET_TOKENS_SUCCESS,
  GET_TOKENS_ERROR,
  ADD_TOKEN_ERROR,
  ADD_TOKEN_SUCCESS,
  DELETE_TOKEN,
  DELETE_TOKEN_ERROR,
  DELETE_TOKEN_SUCCESS,
  CHANGE_TOKEN_NAME,
  CHANGE_SELECTED,
} from './constants';

export const initialState = {
  errorText: '',
  loadingData: false,
  downloaded: false,
  tokens: [],
  tokenId: '',
  tokenName: '',
  loadingToken: false,
  selected: '',
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TOKEN_NAME:
        draft.tokenName = action.name;
        break;
      case CHANGE_SELECTED:
        draft.selected = action.selected;
        break;
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
      case GET_TOKENS:
        draft.loadingToken = true;
        break;
      case GET_TOKENS_SUCCESS:
        draft.loadingToken = false;
        draft.tokens = action.tokens;
        break;
      case GET_TOKENS_ERROR:
        draft.loadingToken = false;
        draft.errorText = action.error;
        break;
      case ADD_TOKEN_SUCCESS:
        draft.tokenName = '';
        break;
      case ADD_TOKEN_ERROR:
        draft.tokenName = '';
        draft.errorText = action.error;
        break;
      case DELETE_TOKEN:
        draft.tokenId = action.id;
        break;
      case DELETE_TOKEN_SUCCESS:
        draft.tokenId = '';
        break;
      case DELETE_TOKEN_ERROR:
        draft.tokenId = '';
        draft.errorText = action.error;
        break;
    }
  });

export default settingsReducer;
