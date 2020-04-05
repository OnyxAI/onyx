import produce from 'immer';
import neuronsReducer from '../reducer';
import { getNeurons, getNeuronsError, getNeuronsSuccess } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('neuronsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loadingNeurons: true,
      neurons: [],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(neuronsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getNeurons action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeurons = true;
    });

    expect(neuronsReducer(state, getNeurons())).toEqual(expectedResult);
  });

  it('should handle the getNeuronsSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeurons = false;
      draft.neurons = [];
    });

    expect(neuronsReducer(state, getNeuronsSuccess([]))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getNeuronsError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingNeurons = false;
    });

    expect(
      neuronsReducer(state, getNeuronsError('An error has occured')),
    ).toEqual(expectedResult);
  });
});
