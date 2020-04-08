import { createSelector } from 'reselect';

const selectSettings = state => state.settings;

const makeSelectSettings = () =>
  createSelector(
    selectSettings,
    settingsState => settingsState,
  );

export { makeSelectSettings };
