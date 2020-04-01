/**
 * Test loading Neuron
 */

// import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';
// import React from 'react';
// import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';

// import configureStore from '../../configureStore';
import injectReducer from '../injectReducer';
import loadNeuron from '../loadNeuron';
// Fixtures
const Component = () => null;

const reducer = s => (s !== undefined ? s : null);

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

const reducers = { key: 'test', reducer };

const sagas = {
  key: 'test',
  saga: testSaga,
};

function mapDispatchToProps(dispatch) {
  return {
    test: () => dispatch('test'),
  };
}

function mapStateToProps(state) {
  return state;
}

describe('loadNeuron Container', () => {
  // let store;
  let NeuronComponent;

  beforeEach(() => {
    // store = configureStore({}, memoryHistory);

    const ReducerComponent = injectReducer({ key: 'test', reducer })(Component);

    NeuronComponent = loadNeuron({
      mapDispatchToProps,
      mapStateToProps,
      reducers,
      sagas,
    })(ReducerComponent);
  });

  it('should set a correct display name', () => {
    expect(NeuronComponent.displayName).toBe('Connect(Component)');
    expect(
      loadNeuron({
        mapDispatchToProps,
        mapStateToProps,
        reducers,
        sagas,
      })(() => null).displayName,
    ).toBe('Connect(Component)');
  });
});
