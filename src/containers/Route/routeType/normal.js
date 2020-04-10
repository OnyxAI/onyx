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
  sockyx,
  containerType,
  container: Container,
  ...rest
}) {
  return <Route {...rest} render={props => <Container {...props} />} />;
}

Normal.propTypes = {
  sockyx: PropTypes.object,
  container: PropTypes.object,
  containerType: PropTypes.string,
};
