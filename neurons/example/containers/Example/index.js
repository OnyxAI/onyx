/**
 *
 * Example
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
//import { connect, ReactReduxContext } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
//import { compose } from 'redux';

//import { Context } from 'onyx/utils/getContext';

import { Card, CardBody, CardHeader, CardTitle } from 'uikit-react';

//import { useInjectSaga } from 'onyx/utils/injectSaga';
//import { useInjectReducer } from 'onyx/utils/injectReducer';
import makeSelectExample from './selectors';
import exampleReducer from './reducer';
import exampleSaga from './saga';
import messages from './messages';

export const reducer = exampleReducer;
export const saga = exampleSaga;

export function Example() {
  return (
    <div>
      <Helmet>
        <title>Example</title>
        <meta name="description" content="Description of Example" />
      </Helmet>
      <Card hover>
        <CardHeader>
          <CardTitle>
            <FormattedMessage {...messages.header} />
          </CardTitle>
          <CardBody>
            <p>Hello World !</p>
          </CardBody>
        </CardHeader>
      </Card>
    </div>
  );
}

Example.propTypes = {
  user: PropTypes.object,
};

export const mapStateToProps = createStructuredSelector({
  example: makeSelectExample(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}