/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Logo from 'assets/img/logo/blue.png';

import makeSelectAuth from './selectors';
import { loginUser, changeInput } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Login({ auth, onSubmitForm, onChangeInput }) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  return (
    <div className="container">
      <div className="uk-text-center uk-position-center">
        <FormattedMessage {...messages.login_header}>
          {message => (
            <Helmet>
              <title>{message}</title>
              <meta name="description" content="Description of Login" />
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
          <form onSubmit={onSubmitForm}>
            <div className="uk-form-row uk-padding-small">
              <FormattedMessage {...messages.email}>
                {message => (
                  <input
                    type="email"
                    className="uk-input uk-form-large"
                    placeholder={message}
                    value={auth.email}
                    onChange={evt => onChangeInput(evt, 'email')}
                  />
                )}
              </FormattedMessage>
            </div>
            <div className="uk-form-row uk-padding-small">
              <FormattedMessage {...messages.password}>
                {message => (
                  <input
                    type="password"
                    className="uk-input uk-form-large"
                    placeholder={message}
                    value={auth.password}
                    onChange={evt => onChangeInput(evt, 'password')}
                  />
                )}
              </FormattedMessage>
            </div>
            <div className="uk-form-row uk-padding-small">
              <button
                className="uk-button uk-button-primary uk-button-large"
                type="submit"
              >
                <FormattedMessage id="onyx.global.submit" />
              </button>
            </div>
            <div className="uk-form-row">
              <label className="uk-float-left ">
                <input type="checkbox" className="uk-checkbox" />
                <FormattedMessage {...messages.remember} />
              </label>
              <a className="uk-float-right uk-link uk-link-muted" href="/">
                <FormattedMessage {...messages.forgot} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  auth: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onChangeInput: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginUser());
    },
    onChangeInput: (evt, input) => {
      dispatch(changeInput(input, evt.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
