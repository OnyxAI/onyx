/**
 *
 * Settings
 *
 */

import React, { memo, useEffect } from 'react';
import Proptypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';
import { getMessage } from '@onyx/i18n';
import Loader from '@onyx/components/Loader';
import Container from '@onyx/components/Container';
import {
  getOnyxData,
  getTokens,
  addToken,
  changeTokenName,
  deleteToken,
  changeSelected,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSettings } from './selectors';
import messages from './messages';

export function Settings({
  getOnyxDataFunc,
  settings,
  user,
  getTokensFunc,
  addTokenFunc,
  changeSelectedFunc,
  deleteTokenFunc,
  changeTokenNameFunc,
}) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  useEffect(() => {
    getTokensFunc();
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Settings" />
          </Helmet>
        )}
      </FormattedMessage>
      {settings ? (
        <Container
          user={user}
          title={<FormattedMessage {...messages.header} />}
        >
          <div className="uk-padding center">
            <label htmlFor="settings" className="uk-form-label">
              <FormattedMessage {...messages.header} />
            </label>
            <div className="uk-form-controls">
              <select
                onChange={evt => changeSelectedFunc(evt)}
                name="settings"
                className="uk-select uk-form-width-medium"
              >
                <option value="data">
                  {getMessage(
                    user.language.substring(0, 2),
                    messages.onyx_data_title.id,
                  )}
                </option>
                <option value="tokens">
                  {getMessage(
                    user.language.substring(0, 2),
                    messages.tokens_title.id,
                  )}
                </option>
              </select>
            </div>
          </div>

          {settings.selected === 'data' && (
            <div>
              <h4 className="center">
                <FormattedMessage {...messages.onyx_data_header} />
              </h4>
              {settings.loadingData ? (
                <span
                  className="uk-margin-small-right center"
                  uk-spinner="ratio: 1"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => getOnyxDataFunc()}
                  className={`btn center ${user.color} secondary`}
                >
                  <FormattedMessage {...messages.onyx_data} />
                </button>
              )}
            </div>
          )}

          {settings.selected === 'tokens' && (
            <div>
              <h4 className="center">
                <FormattedMessage {...messages.tokens_title} />
              </h4>

              <input
                placeHolder="Name"
                className="center"
                value={settings.tokenName}
                onChange={evt => changeTokenNameFunc(evt)}
              />

              <button
                className="uk-button uk-button-default center"
                type="button"
                onClick={() => addTokenFunc()}
              >
                <FormattedMessage id="onyx.global.send" />
              </button>

              {!settings.loadingToken && (
                <table className="uk-table uk-table-justify uk-table-divider">
                  <thead>
                    <tr>
                      <th className="uk-width-small">
                        <FormattedMessage {...messages.name} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.copy} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.delete} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {settings.tokens &&
                      settings.tokens.map(token => (
                        <tr>
                          <td>{token.name}</td>
                          <td>{token.token}</td>
                          <td>
                            {token.name !== 'system' && (
                              <button
                                className={`btn ${user.color}`}
                                type="button"
                                onClick={() => deleteTokenFunc(token.id)}
                              >
                                <i className="fas fa-minus" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

Settings.propTypes = {
  getOnyxDataFunc: Proptypes.func,
  getTokensFunc: Proptypes.func,
  addTokenFunc: Proptypes.func,
  changeSelectedFunc: Proptypes.func,
  deleteTokenFunc: Proptypes.func,
  changeTokenNameFunc: Proptypes.func,
  settings: Proptypes.object,
  user: Proptypes.object,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getOnyxDataFunc: () => {
      dispatch(getOnyxData());
    },
    getTokensFunc: () => {
      dispatch(getTokens());
    },
    addTokenFunc: () => {
      dispatch(addToken());
    },
    changeTokenNameFunc: evt => {
      if (evt && evt.target) {
        dispatch(changeTokenName(evt.target.value));
      }
    },
    changeSelectedFunc: evt => {
      if (evt && evt.target) {
        dispatch(changeSelected(evt.target.value));
      }
    },
    deleteTokenFunc: id => {
      dispatch(deleteToken(id));
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
)(Settings);
