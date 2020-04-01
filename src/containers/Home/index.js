/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import 'assets/css/auth.css';
import Logo from 'assets/img/logo/blue.png';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import messages from './messages';

export function Home() {
  return (
    <div>
      <div className="background" />
      <div className="container">
        <div className="uk-text-center uk-position-center">
          <FormattedMessage {...messages.hello_header}>
            {message => (
              <Helmet>
                <title>{message}</title>
                <meta name="description" content="Description of Hello" />
              </Helmet>
            )}
          </FormattedMessage>
          <div className="uk-card uk-card-default uk-padding">
            <img
              className="uk-margin-bottom"
              width="140"
              height="120"
              alt="logo"
              src={Logo}
            />
            <div className="uk-form-row uk-padding-small">
              <a
                className="uk-button uk-button-primary uk-button-large"
                href="/login"
              >
                <FormattedMessage id="onyx.auth.login_header" />
              </a>
            </div>
            <div className="uk-form-row uk-padding-small">
              <a
                className="uk-button uk-button-primary uk-button-large"
                href="/register"
              >
                <FormattedMessage id="onyx.auth.register_header" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
