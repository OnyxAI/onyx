/* eslint-disable no-nested-ternary */
/**
 *
 * Normal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
export default function Normal({
  containerType,
  container: Container,
  ...rest
}) {
  return <Route {...rest} render={props => <Container {...props} />} />;
}

Normal.propTypes = {
  container: PropTypes.func,
  containerType: PropTypes.string,
};
