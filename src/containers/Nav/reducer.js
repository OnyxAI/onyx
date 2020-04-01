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
  ADD_NAV,
  ADD_NAV_ERROR,
  ADD_NAV_SUCCESS,
  CHANGE_NAV_ON_MANAGE,
  REMOVE_NAV,
  REMOVE_NAV_ERROR,
  GET_NAV_SUCCESS,
  GET_NAV_ERROR,
} from './constants';

export const initialState = {
  errorText: '',
  buttonNumber: '',
  position: '',
  icon: 'fa fa-home',
  url: '/',
  color: 'rgb(197, 56, 56)',
  onManage: false,
  nav: [],
};

/* eslint-disable default-case, no-param-reassign */
const navReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAV_ON_MANAGE:
        draft.onManage = action.onManage;
        break;
      case CHANGE_NAV_ICON:
        draft.icon = action.icon;
        break;
      case CHANGE_NAV_URL:
        draft.url = action.url;
        break;
      case CHANGE_NAV_COLOR:
        draft.color = action.color;
        break;
      case ADD_NAV:
        draft.position = action.position;
        draft.buttonNumber = action.buttonNumber;
        if (draft.icon === '') {
          draft.icon = initialState.icon;
        }
        if (draft.url === '') {
          draft.url = initialState.url;
        }
        if (draft.color === '') {
          draft.color = initialState.color;
        }
        break;
      case ADD_NAV_SUCCESS:
        draft.position = '';
        draft.buttonNumber = '';
        draft.color = '';
        draft.icon = '';
        draft.url = '';
        break;
      case ADD_NAV_ERROR:
        draft.errorText = action.error;
        draft.position = '';
        draft.buttonNumber = '';
        draft.color = '';
        draft.icon = '';
        draft.url = '';
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
        break;
      case GET_NAV_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default navReducer;
