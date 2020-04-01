import produce from 'immer';
import navReducer from '../reducer';
import {
  changeNavColor,
  changeNavIcon,
  changeOnManage,
  changeNavUrl,
  addNav,
  addNavSuccess,
  addNavError,
  removeNav,
  removeNavError,
  getNavSuccess,
  getNavError,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('authReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      buttonNumber: '',
      position: '',
      icon: 'fa fa-home',
      url: '/',
      color: 'rgb(197, 56, 56)',
      onManage: false,
      nav: [],
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

  it('should handle the changeUrl action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.url = '/';
    });

    expect(navReducer(state, changeNavUrl('/'))).toEqual(expectedResult);
  });

  it('should handle the changeOnManage action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.onManage = true;
    });

    expect(navReducer(state, changeOnManage(true))).toEqual(expectedResult);
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
      draft.color = 'rgb(197, 56, 56)';
      draft.icon = 'fa fa-home';
      draft.url = '/';
    });

    expect(navReducer(state, addNavSuccess())).toEqual(expectedResult);
  });

  it('should handle the addNavError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'Error';
      draft.position = '';
      draft.buttonNumber = '';
      draft.color = '';
      draft.icon = '';
      draft.url = '';
    });

    expect(navReducer(state, addNavError('Error'))).toEqual(expectedResult);
  });

  it('should handle the getNavSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.nav = {};
    });

    expect(navReducer(state, getNavSuccess({}))).toEqual(expectedResult);
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
});
