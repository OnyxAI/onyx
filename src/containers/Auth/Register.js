/**
 *
 * Register
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Logo from 'assets/img/logo/blue.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuth from './selectors';
import { registerUser, changeInput } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Register({ auth, onChangeInput, onSubmitForm }) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  return (
    <div className="uk-text-center uk-position-center">
      <FormattedMessage {...messages.register_header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Register" />
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
        <form onSubmit={onSubmitForm} className="uk-grid-small">
          <div className="uk-form-row">
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
          <div className="uk-form-row">
            <FormattedMessage {...messages.username}>
              {message => (
                <input
                  type="text"
                  className="uk-input uk-form-large"
                  placeholder={message}
                  value={auth.username}
                  onChange={evt => onChangeInput(evt, 'username')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="uk-form-row">
            <FormattedMessage {...messages.firstname}>
              {message => (
                <input
                  type="text"
                  className="uk-input uk-form-large"
                  placeholder={message}
                  value={auth.firstname}
                  onChange={evt => onChangeInput(evt, 'firstname')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="uk-form-row">
            <FormattedMessage {...messages.lastname}>
              {message => (
                <input
                  type="text"
                  className="uk-input uk-form-large"
                  placeholder={message}
                  value={auth.lastname}
                  onChange={evt => onChangeInput(evt, 'lastname')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="uk-form-row">
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
          <div className="uk-form-row">
            <FormattedMessage {...messages.verif_password}>
              {message => (
                <input
                  type="password"
                  className="uk-input uk-form-large"
                  placeholder={message}
                  value={auth.verifPassword}
                  onChange={evt => onChangeInput(evt, 'verifPassword')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="uk-form-row">
            <select
              className="uk-select uk-form-large"
              value={auth.language}
              onChange={evt => onChangeInput(evt, 'language')}
            >
              <FormattedMessage {...messages.language}>
                {message => <option default>{message}</option>}
              </FormattedMessage>
              <FormattedMessage {...messages.french}>
                {message => <option value="fr-FR">{message}</option>}
              </FormattedMessage>
              <FormattedMessage {...messages.english}>
                {message => <option value="en-US">{message}</option>}
              </FormattedMessage>
            </select>
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
            <a className="uk-float-right uk-link uk-link-muted" href="/login">
              <FormattedMessage {...messages.login} />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

Register.propTypes = {
  auth: PropTypes.object,
  isRegistered: PropTypes.bool,
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
      dispatch(registerUser());
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
)(Register);
