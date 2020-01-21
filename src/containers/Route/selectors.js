import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCurrentUserDomain = state => state.currentUser || initialState;

const makeSelectCurrentUser = () =>
  createSelector(
    selectCurrentUserDomain,
    substate => substate,
  );

export default makeSelectCurrentUser;
