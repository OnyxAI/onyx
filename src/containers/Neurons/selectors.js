import { createSelector } from 'reselect';

const selectNeurons = state => state.neurons;

const makeSelectNeurons = () =>
  createSelector(
    selectNeurons,
    neuronsState => neuronsState,
  );

export { makeSelectNeurons };
