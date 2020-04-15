import { createSelector } from 'reselect';

const selectInstall = state => state.install;

const makeSelectInstall = () =>
  createSelector(
    selectInstall,
    installState => installState,
  );

export { makeSelectInstall };
