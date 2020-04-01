import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectNeurons = state => state.neurons;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectNeurons = () =>
  createSelector(
    selectNeurons,
    neuronsState => neuronsState,
  );

export { makeSelectLocation, makeSelectNeurons };
