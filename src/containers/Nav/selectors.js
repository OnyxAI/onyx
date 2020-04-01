import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nav state domain
 */

const selectNavDomain = state => state.nav || initialState;

const makeSelectNav = () =>
  createSelector(
    selectNavDomain,
    substate => substate,
  );

export default makeSelectNav;
export { selectNavDomain };
