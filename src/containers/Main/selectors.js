import { createSelector } from 'reselect';

const selectWidgets = state => state.widgets;

const makeSelectWidgets = () =>
  createSelector(
    selectWidgets,
    widgetsState => widgetsState,
  );

export { makeSelectWidgets };
