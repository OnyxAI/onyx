import produce from 'immer';
import navReducer from '../reducer';
import {
  changeNavColor,
  changeNavIcon,
  changeNavCustomIcon,
  changeOnManage,
  changeNavUrl,
  addNav,
  addNavError,
  changeButtonError,
  removeNav,
  removeNavError,
  getNavSuccess,
  getNavError,
} from '../actions';
import { ADD_NAV_SUCCESS, CHANGE_BUTTON_SUCCESS } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('navReducer', () => {
  let state;
  beforeEach(() => {
    state = {
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
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(navReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeColor action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.color = 'blue';
    });

    expect(navReducer(state, changeNavColor('blue'))).toEqual(expectedResult);
  });

  it('should handle the changeIcon action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.icon = 'fa-user';
    });

    expect(navReducer(state, changeNavIcon('fa-user'))).toEqual(expectedResult);
  });

  it('should handle the changeCustomIcon action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.customIcon = 'fa-user';
    });

    expect(navReducer(state, changeNavCustomIcon('fa-user'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeUrl action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.url = '/';
    });

    expect(navReducer(state, changeNavUrl('/'))).toEqual(expectedResult);
  });

  it('should handle the changeOnManage action correctly with manage to true', () => {
    const expectedResult = produce(state, draft => {
      draft.onManage = true;
      draft.selectedButton = '1';
    });

    expect(navReducer(state, changeOnManage(true, '1'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeOnManage action correctly with manage to false', () => {
    const expectedResult = produce(state, draft => {
      draft.onManage = true;
      draft.selectedButton = '1';
    });

    expect(navReducer(state, changeOnManage(false, '1'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the addNav action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.position = '1';
      draft.buttonNumber = '1';
    });

    expect(navReducer(state, addNav('1', '1'))).toEqual(expectedResult);
  });

  it('should handle the addNavSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.position = '';
      draft.buttonNumber = '';
      draft.color = state.color;
      draft.icon = state.icon;
      draft.url = state.url;
    });

    const action = {
      type: ADD_NAV_SUCCESS,
    };

    expect(navReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addNavError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'Error';
      draft.position = '';
      draft.buttonNumber = '';
      draft.color = state.color;
      draft.icon = state.icon;
      draft.url = state.url;
    });

    expect(navReducer(state, addNavError('Error'))).toEqual(expectedResult);
  });

  it('should handle the getNavSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.nav = [];
      draft.buttons = [];
    });

    expect(navReducer(state, getNavSuccess([], []))).toEqual(expectedResult);
  });

  it('should handle the getNavError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'Error';
    });

    expect(navReducer(state, getNavError('Error'))).toEqual(expectedResult);
  });

  it('should handle the removeNav action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.position = '1';
      draft.buttonNumber = '1';
    });

    expect(navReducer(state, removeNav('1', '1'))).toEqual(expectedResult);
  });

  it('should handle the removeNavError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'Error';
    });

    expect(navReducer(state, removeNavError('Error'))).toEqual(expectedResult);
  });

  it('should handle the changeButtonSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.customIcon = '';
      draft.onManage = false;
      draft.selectedButton = '';
    });

    const action = {
      type: CHANGE_BUTTON_SUCCESS,
    };

    expect(navReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the changeButtonError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'Error';
      draft.customIcon = '';
      draft.onManage = false;
      draft.selectedButton = '';
    });

    expect(navReducer(state, changeButtonError('Error'))).toEqual(
      expectedResult,
    );
  });
});
