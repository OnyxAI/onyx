import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the designSettings state domain
 */

const selectDesignSettingsDomain = state =>
  state.designSettings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DesignSettings
 */

const makeSelectColor = () =>
  createSelector(
    selectDesignSettingsDomain,
    substate => substate.color,
  );

export { selectDesignSettingsDomain, makeSelectColor };
