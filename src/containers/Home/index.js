/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

export function Home() {
  return <div>Welcome to Home</div>;
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
