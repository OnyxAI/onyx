/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
