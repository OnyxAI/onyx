import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectNeurons = state => state.neurons;
const selectInstall = state => state.install;

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

const makeSelectInstall = () =>
  createSelector(
    selectInstall,
    installState => installState,
  );

export { makeSelectLocation, makeSelectNeurons, makeSelectInstall };
