import { createSelector } from 'reselect';

const selectScreen = state => state.screen;

const makeSelectScreen = () =>
  createSelector(
    selectScreen,
    screenState => screenState,
  );

export { makeSelectScreen };
