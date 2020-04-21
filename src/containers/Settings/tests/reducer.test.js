import produce from 'immer';
import settingsReducer from '../reducer';
import { getOnyxData } from '../actions';
import {
  GET_ONYX_DATA_ERROR,
  GET_ONYX_DATA_SUCCESS,
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
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('settingsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loadingData: false,
      downloaded: false,
      tokens: [],
      tokenId: '',
      tokenName: '',
      loadingToken: false,
      selected: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(settingsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeSelected action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selected = 1;
    });

    const action = {
      type: CHANGE_SELECTED,
      selected: 1,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the changeTokenName action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tokenName = 'name';
    });

    const action = {
      type: CHANGE_TOKEN_NAME,
      name: 'name',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getOnyxData action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.downloaded = false;
      draft.loadingData = true;
    });

    expect(settingsReducer(state, getOnyxData())).toEqual(expectedResult);
  });

  it('should handle the getOnyxDataSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingData = false;
      draft.downloaded = true;
    });

    const action = {
      type: GET_ONYX_DATA_SUCCESS,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getOnyxDataError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.downloaded = false;
      draft.loadingData = false;
    });

    const action = {
      type: GET_ONYX_DATA_ERROR,
      error: 'An error has occured',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getTokens action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingToken = true;
    });

    const action = {
      type: GET_TOKENS,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getTokensSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingToken = false;
      draft.tokens = [{}];
    });

    const action = {
      type: GET_TOKENS_SUCCESS,
      tokens: [{}],
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getTokensError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingToken = false;
    });

    const action = {
      type: GET_TOKENS_ERROR,
      error: 'An error has occured',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteToken action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tokenId = 1;
    });

    const action = {
      type: DELETE_TOKEN,
      id: 1,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteTokenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tokenId = '';
    });

    const action = {
      type: DELETE_TOKEN_SUCCESS,
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteTokenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.tokenId = '';
    });

    const action = {
      type: DELETE_TOKEN_ERROR,
      error: 'An error has occured',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addTokenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tokenName = '';
    });

    const action = {
      type: ADD_TOKEN_SUCCESS,
      tokens: {},
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addTokenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.tokenName = '';
    });

    const action = {
      type: ADD_TOKEN_ERROR,
      error: 'An error has occured',
    };

    expect(settingsReducer(state, action)).toEqual(expectedResult);
  });
});
