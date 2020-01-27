/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from 'utils/loadable';

const Login = loadable(() => import('./Login'));
const Register = loadable(() => import('./Register'));

export { Login, Register };
