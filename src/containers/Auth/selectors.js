import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    substate => substate,
  );

export default makeSelectAuth;
