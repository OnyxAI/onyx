/**
 *
 * Install
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@onyx/components/Container';

import '@onyx/assets/css/auth.css';
import Logo from '@onyx/assets/img/logo/blue.png';

import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';

import { getOnyxData } from '@onyx/containers/Settings/actions';

import settingsSaga from '@onyx/containers/Settings/saga';
import settingsReducer from '@onyx/containers/Settings/reducer';

import { makeSelectSettings } from '@onyx/containers/Settings/selectors';

import { makeSelectInstall } from './selectors';
import { installOnyx, changeInput, changeStep, accountError } from './actions';
import reducer from './reducer';
import saga from './saga';

import messages from './messages';

function validateEmail(mail) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function Install({
  install,
  settings,
  onChangeInput,
  onSubmit,
  accountErrorFunc,
  changeStepFunc,
  getOnyxDataFunc,
}) {
  useInjectReducer({ key: 'install', reducer });
  useInjectSaga({ key: 'install', saga });

  useInjectReducer({ key: 'settings', reducer: settingsReducer });
  useInjectSaga({ key: 'settings', saga: settingsSaga });

  const isEmptyAccount = () => {
    if (
      install.username !== '' &&
      install.firstname !== '' &&
      install.lastname !== '' &&
      install.email !== '' &&
      install.password !== '' &&
      install.verifPassword !== '' &&
      install.language !== '' &&
      install.password === install.verifPassword &&
      validateEmail(install.email)
    ) {
      accountErrorFunc('');
      return false;
    }
    if (!validateEmail(install.email) && install.email !== '') {
      accountErrorFunc('error_email');
      return true;
    }
    if (install.password !== install.verifPassword && install.password !== '') {
      accountErrorFunc('error_password');
      return true;
    }
    accountErrorFunc('error_empty');
    return true;
  };

  return (
    <div>
      <div className="background" />
      <div className="container install_container">
        <Container title={<FormattedMessage {...messages.header} />}>
          <FormattedMessage {...messages.header}>
            {message => (
              <Helmet>
                <title>{message}</title>
                <meta name="description" content="Description of Install" />
              </Helmet>
            )}
          </FormattedMessage>
          {install.step === 1 && (
            <div>
              <img
                className="uk-margin-bottom center"
                width="140"
                height="120"
                alt="logo"
                src={Logo}
              />

              <h5 className="center">
                <FormattedMessage {...messages.welcome_message} />
              </h5>

              <div className="uk-form-row uk-padding-small center">
                <button
                  className="uk-button uk-button-primary uk-button-large"
                  type="button"
                  onClick={() => changeStepFunc(2)}
                >
                  <FormattedMessage {...messages.next} />
                </button>
              </div>
            </div>
          )}

          {install.step === 2 && (
            <div>
              <img
                className="uk-margin-bottom center"
                width="140"
                height="120"
                alt="logo"
                src={Logo}
              />

              <h5 className="center">
                <FormattedMessage {...messages.header_data} />
              </h5>

              {settings.loadingData ? (
                <span
                  className="uk-margin-small-right center"
                  uk-spinner="ratio: 1"
                />
              ) : (
                <div className="uk-form-row uk-padding-small center">
                  <button
                    className="uk-button uk-button-primary uk-button-large"
                    type="button"
                    onClick={() => getOnyxDataFunc()}
                  >
                    <FormattedMessage {...messages.download_data} />
                  </button>
                </div>
              )}

              {settings.downloaded && (
                <div className="uk-form-row uk-padding-small center">
                  <button
                    className="uk-button uk-button-primary uk-button-large"
                    type="button"
                    onClick={() => changeStepFunc(1)}
                  >
                    <FormattedMessage {...messages.previous} />
                  </button>
                  <button
                    className="uk-button uk-button-primary uk-button-large"
                    type="button"
                    onClick={() => changeStepFunc(3)}
                  >
                    <FormattedMessage {...messages.next} />
                  </button>
                </div>
              )}
            </div>
          )}

          {install.step === 3 && (
            <div>
              <img
                className="uk-margin-bottom center"
                width="140"
                height="120"
                alt="logo"
                src={Logo}
              />

              <h5 className="center">
                <FormattedMessage {...messages.header_account} />
              </h5>

              {install.errorText !== '' && (
                <h5 className="center red-text">
                  <FormattedMessage
                    id={messages[install.errorText].id}
                    defaultMessage={messages[install.errorText].defaultMessage}
                  />
                </h5>
              )}

              <div className="uk-form-row">
                <FormattedMessage {...messages.email}>
                  {message => (
                    <input
                      type="email"
                      id="email"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.email}
                      required
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
                      id="username"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.username}
                      required
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
                      id="firstname"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.firstname}
                      required
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
                      id="lastname"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.lastname}
                      required
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
                      id="password"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.password}
                      required
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
                      id="verifPassword"
                      className="uk-input uk-form-large"
                      placeholder={message}
                      value={install.verifPassword}
                      required
                      onChange={evt => onChangeInput(evt, 'verifPassword')}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className="uk-form-row">
                <select
                  className="uk-select uk-form-large"
                  id="language"
                  value={install.language}
                  required
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

              {!isEmptyAccount() && (
                <div className="uk-form-row uk-padding-small center">
                  <button
                    className="uk-button uk-button-primary uk-button-large"
                    type="button"
                    onClick={() => changeStepFunc(2)}
                  >
                    <FormattedMessage {...messages.previous} />
                  </button>
                  <button
                    className="uk-button uk-button-primary uk-button-large"
                    type="button"
                    onClick={() => changeStepFunc(4)}
                  >
                    <FormattedMessage {...messages.next} />
                  </button>
                </div>
              )}
            </div>
          )}

          {install.step === 4 && (
            <div>
              <img
                className="uk-margin-bottom center"
                width="140"
                height="120"
                alt="logo"
                src={Logo}
              />

              <h5 className="center">
                <FormattedMessage {...messages.header_finish} />
              </h5>

              <div className="uk-form-row uk-padding-small center">
                <button
                  className="uk-button uk-button-primary uk-button-large"
                  type="button"
                  onClick={() => onSubmit()}
                >
                  <FormattedMessage {...messages.finish} />
                </button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

Install.propTypes = {
  install: PropTypes.object,
  settings: PropTypes.object,
  changeStepFunc: PropTypes.func,
  accountErrorFunc: PropTypes.func,
  getOnyxDataFunc: PropTypes.func,
  onSubmit: PropTypes.func,
  onChangeInput: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  install: makeSelectInstall(),
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      dispatch(installOnyx());
    },
    changeStepFunc: step => {
      dispatch(changeStep(step));
    },
    onChangeInput: (evt, input) => {
      dispatch(changeInput(input, evt.target.value));
    },
    getOnyxDataFunc: () => {
      dispatch(getOnyxData());
    },
    accountErrorFunc: error => {
      dispatch(accountError(error));
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
)(Install);
