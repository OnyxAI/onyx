/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from '@onyx/utils/loadable';

const Login = loadable(() => import('./Login'));
const Register = loadable(() => import('./Register'));
const Manage = loadable(() => import('./Manage'));

export { Login, Register, Manage };
