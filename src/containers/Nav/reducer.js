/*
 *
 * Nav reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_NAV_URL,
  CHANGE_NAV_ICON,
  CHANGE_NAV_COLOR,
  CHANGE_NAV_CUSTOM_ICON,
  ADD_NAV,
  ADD_NAV_ERROR,
  ADD_NAV_SUCCESS,
  CHANGE_NAV_ON_MANAGE,
  REMOVE_NAV,
  REMOVE_NAV_ERROR,
  GET_NAV_SUCCESS,
  GET_NAV_ERROR,
  CHANGE_BUTTON_SUCCESS,
  CHANGE_BUTTON_ERROR,
} from './constants';

export const initialState = {
  errorText: '',
  buttonNumber: '',
  position: '',
  icon: 'fa fa-home',
  customIcon: 'fa fa-home',
  url: '/',
  color: 'rgb(197, 56, 56)',
  onManage: false,
  selectedButton: '',
  nav: [],
  buttons: [],
};

/* eslint-disable default-case, no-param-reassign */
const navReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAV_ON_MANAGE:
        if (!action.onManage && draft.selectedButton !== action.button) {
          draft.onManage = true;
          draft.selectedButton = action.button;
        } else {
          draft.onManage = action.onManage;
          draft.selectedButton = action.button;
        }
        break;
      case CHANGE_NAV_ICON:
        draft.icon = action.icon;
        break;
      case CHANGE_NAV_CUSTOM_ICON:
        draft.customIcon = action.icon;
        break;
      case CHANGE_NAV_URL:
        draft.url = action.url;
        break;
      case CHANGE_NAV_COLOR:
        draft.color = action.color;
        break;
      case CHANGE_BUTTON_SUCCESS:
        draft.customIcon = '';
        draft.onManage = false;
        draft.selectedButton = '';
        break;
      case CHANGE_BUTTON_ERROR:
        draft.errorText = action.error;
        draft.customIcon = '';
        draft.onManage = false;
        draft.selectedButton = '';
        break;
      case ADD_NAV:
        draft.position = action.position;
        draft.buttonNumber = action.buttonNumber;
        break;
      case ADD_NAV_SUCCESS:
        draft.position = '';
        draft.buttonNumber = '';
        draft.color = initialState.color;
        draft.icon = initialState.icon;
        draft.url = initialState.url;
        break;
      case ADD_NAV_ERROR:
        draft.errorText = action.error;
        draft.position = '';
        draft.buttonNumber = '';
        draft.color = initialState.color;
        draft.icon = initialState.icon;
        draft.url = initialState.url;
        break;
      case REMOVE_NAV:
        draft.position = action.position;
        draft.buttonNumber = action.buttonNumber;
        break;
      case REMOVE_NAV_ERROR:
        draft.errorText = action.error;
        break;
      case GET_NAV_SUCCESS:
        draft.nav = action.nav;
        draft.buttons = action.buttons;
        break;
      case GET_NAV_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default navReducer;
