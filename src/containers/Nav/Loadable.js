/**
 *
 * Asynchronously loads the component for Nav
 *
 */

import loadable from '@onyx/utils/loadable';

export default loadable(() => import('./index'));
