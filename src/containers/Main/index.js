/**
 *
 * Main
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@onyx/components/Container';
import messages from './messages';

export function Main() {
  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Neurons" />
          </Helmet>
        )}
      </FormattedMessage>
      <Container title={<FormattedMessage {...messages.header} />}>
        <FormattedMessage {...messages.welcome} />
      </Container>
    </div>
  );
}

export const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Main);
