/*
 *
 * Screen reducer
 *
 */
import produce from 'immer';
import {
  GET_SCREEN,
  GET_SCREEN_SUCCESS,
  GET_SCREEN_ERROR,
  GET_SCREEN_STORE,
  GET_SCREEN_STORE_SUCCESS,
  GET_SCREEN_STORE_ERROR,
  ADD_SCREEN_ERROR,
  ADD_SCREEN_SUCCESS,
  DELETE_SCREEN,
  DELETE_SCREEN_ERROR,
  DELETE_SCREEN_SUCCESS,
  CHANGE_SCREEN,
} from './constants';

export const initialState = {
  errorText: '',
  loadingScreen: false,
  screen: [],
  loadingScreenStore: false,
  screenStore: [],
  screenName: '',
  screenId: '',
  screenRaw: '',
  screenType: '',
};

/* eslint-disable default-case, no-param-reassign */
const screenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SCREEN:
        draft.screenName = action.name;
        draft.screenRaw = action.raw;
        draft.screenType = action.screenType;
        break;
      case GET_SCREEN:
        draft.loadingScreen = true;
        break;
      case GET_SCREEN_SUCCESS:
        draft.loadingScreen = false;
        draft.screen = action.screen;
        break;
      case GET_SCREEN_ERROR:
        draft.loadingScreen = false;
        draft.errorText = action.error;
        break;
      case GET_SCREEN_STORE:
        draft.loadingScreenStore = true;
        break;
      case GET_SCREEN_STORE_SUCCESS:
        draft.loadingScreenStore = false;
        draft.screenStore = action.screenStore;
        break;
      case GET_SCREEN_STORE_ERROR:
        draft.loadingScreenStore = false;
        draft.errorText = action.error;
        break;
      case ADD_SCREEN_SUCCESS:
        draft.screenName = '';
        draft.screenRaw = '';
        draft.screenType = '';
        break;
      case ADD_SCREEN_ERROR:
        draft.screenName = '';
        draft.screenRaw = '';
        draft.screenType = '';
        draft.errorText = action.error;
        break;
      case DELETE_SCREEN:
        draft.screenId = action.id;
        break;
      case DELETE_SCREEN_SUCCESS:
        draft.screenId = '';
        break;
      case DELETE_SCREEN_ERROR:
        draft.screenId = '';
        draft.errorText = action.error;
        break;
    }
  });

export default screenReducer;
