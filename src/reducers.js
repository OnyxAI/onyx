/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './utils/history';
import languageProviderReducer from './containers/LanguageProvider/reducer';
import currentUserReducer from './containers/Route/reducer';
import neuronsReducer from './containers/Neurons/reducer';
import globalReducer from './global/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    global: globalReducer,
    neurons: neuronsReducer,
    currentUser: currentUserReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
