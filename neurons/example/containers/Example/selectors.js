import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the example state domain
 */

const selectExampleDomain = state => state.example || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Example
 */

const makeSelectExample = () =>
  createSelector(
    selectExampleDomain,
    substate => substate,
  );

export default makeSelectExample;
export { selectExampleDomain };
