/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from '@onyx/utils/loadable';

export default loadable(() => import('./index'));
