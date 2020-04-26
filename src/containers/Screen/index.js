/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * Screen
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-materialize';
import { getLogo } from '@onyx/utils/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';
import { useInterval } from '@onyx/utils/useInterval';
import { getMessage } from '@onyx/i18n';
import styles from '@onyx/assets/css/screen.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@onyx/components/Container';
import Widget from '@onyx/components/Widget';

import userSaga from '@onyx/containers/Route/saga';
import { refreshToken } from '@onyx/containers/Route/actions';

import {
  getScreen,
  getScreenStore,
  addScreen,
  deleteScreen,
  onChangeScreen,
} from './actions';
import { makeSelectScreen } from './selectors';

import saga from './saga';
import reducer from './reducer';
import messages from './messages';

function loadComponent(scope, module) {
  window[scope].override(
    Object.assign(
      {
        react: () => Promise.resolve().then(() => () => require('react')),
        'react-dom': () =>
          Promise.resolve().then(() => () => require('react-dom')),
        redux: () => Promise.resolve().then(() => () => require('redux')),
        'react-redux': () =>
          Promise.resolve().then(() => () => require('react-redux')),
        'react-intl': () =>
          Promise.resolve().then(() => () => require('react-intl')),
      },
      __webpack_require__.O,
    ),
  );

  return window[scope].get(module).then(factory => {
    const Module = factory();
    return Module;
  });
}

const useDynamicScript = args => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);

    element.onload = () => {
      console.log(`Neuron Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Neuron Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Neuron Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function GetScreen(props) {
  const { ready, failed } = useDynamicScript({
    url: props.neuronSettings && props.neuronSettings.url,
  });

  if (!props.neuronSettings) {
    return <div />;
  }

  if (!ready) {
    return <span className="uk-margin-small-right" uk-spinner="ratio: 1" />;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.neuronSettings.url}</h2>;
  }
  const Component = React.lazy(() =>
    loadComponent(props.neuronSettings.scope, props.neuronSettings.module),
  );

  return (
    <React.Suspense
      fallback={
        <span className="uk-margin-small-right" uk-spinner="ratio: 1" />
      }
    >
      <Component {...props} />
    </React.Suspense>
  );
}

export function Screen({
  user,
  screen,
  onChangeScreenFunc,
  getScreenFunc,
  getScreenStoreFunc,
  addScreenFunc,
  deleteScreenFunc,
  refreshTokenFunc,
}) {
  useInjectReducer({ key: 'screen', reducer });
  useInjectSaga({ key: 'screen', saga });
  useInjectSaga({ key: 'auth', saga: userSaga });

  useInterval(() => {
    refreshTokenFunc();
  }, 300000);

  useInterval(() => {
    refreshTokenFunc();
    getScreenStoreFunc();
    getScreenFunc();
  }, 60000);

  useEffect(() => {
    getScreenStoreFunc();
    getScreenFunc();
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Screen" />
          </Helmet>
        )}
      </FormattedMessage>
      {screen && (
        <div>
          <Link to="/">
            <Img
              alt="Logo"
              className="uk-position-fixed uk-position-top-center logo-top"
              src={getLogo(user.color)}
            />
          </Link>

          {!screen.loadingScreenStore && (
            <Modal
              header={getMessage(
                user.language.substring(0, 2),
                messages.modal_header.id,
              )}
              actions={<p />}
              trigger={
                <div className="screen-button">
                  <button
                    type="button"
                    className={`btn-floating btn-large ${user.color}`}
                  >
                    <i
                      className="fa fa-plus"
                      style={{
                        fontSize: '15px',
                        color: 'white',
                        position: 'relative',
                      }}
                    />
                  </button>
                </div>
              }
            >
              <div>
                <div className="uk-padding-small">
                  <label htmlFor="screen">
                    <FormattedMessage {...messages.screen} />
                  </label>
                  <select
                    name="screen"
                    className="uk-select uk-form-large"
                    value={screen.screenName}
                    required
                  >
                    <option
                      value=""
                      onClick={() => onChangeScreenFunc('', '', '')}
                    >
                      {getMessage(
                        user.language.substring(0, 2),
                        messages.screen.id,
                      )}
                    </option>
                    {screen.screenStore.map((item, index) => (
                      <option
                        key={index.toString()}
                        value={item.name}
                        onClick={() =>
                          onChangeScreenFunc(item.name, item.raw, item.type)
                        }
                      >
                        {item.beautifulName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="uk-padding-small center">
                  <button
                    type="submit"
                    className="uk-button uk-button-primary uk-button-large"
                    onClick={() => addScreenFunc()}
                  >
                    <FormattedMessage id="onyx.global.send" />
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {screen.screen && screen.screen.length !== 0 ? (
            <div
              className="uk-grid-medium uk-flex-center uk-padding uk-text-center screen-container"
              data-uk-grid
            >
              {screen.screen.map(element => {
                if (element.type === 'neuron') {
                  return (
                    <GetScreen
                      neuronSettings={{
                        url: `/api/neurons/serve/${element.raw}/remoteEntry.js`,
                        scope: element.raw,
                        module: element.name,
                      }}
                      deleteWidget={() => deleteScreenFunc(element.id)}
                      user={user}
                    />
                  );
                }
                return (
                  <Widget
                    title={screen.name}
                    delete={() => deleteScreenFunc(screen.id)}
                  >
                    <p>Content</p>
                  </Widget>
                );
              })}
            </div>
          ) : (
            <div className="screen-container">
              <Container
                user={user}
                title={<FormattedMessage {...messages.header} />}
              >
                <h4 className="center">
                  <FormattedMessage {...messages.no_screen} />
                </h4>
              </Container>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const Img = styled.img`
  top: 20px;
  width: 150px;
  height: 150px;
`;

GetScreen.propTypes = {
  neuronSettings: PropTypes.object,
  url: PropTypes.string,
  scope: PropTypes.string,
  module: PropTypes.string,
};

Screen.propTypes = {
  refreshTokenFunc: PropTypes.func,
  user: PropTypes.object,
  screen: PropTypes.object,
  onChangeScreenFunc: PropTypes.func,
  getScreenFunc: PropTypes.func,
  getScreenStoreFunc: PropTypes.func,
  addScreenFunc: PropTypes.func,
  deleteScreenFunc: PropTypes.func,
};

export const mapStateToProps = createStructuredSelector({
  screen: makeSelectScreen(),
});

export function mapDispatchToProps(dispatch) {
  return {
    refreshTokenFunc: () => {
      dispatch(refreshToken());
    },
    getScreenFunc: () => {
      dispatch(getScreen());
    },
    getScreenStoreFunc: () => {
      dispatch(getScreenStore());
    },
    addScreenFunc: () => {
      dispatch(addScreen());
    },
    deleteScreenFunc: id => {
      dispatch(deleteScreen(id));
    },
    onChangeScreenFunc: (name, raw, type) => {
      dispatch(onChangeScreen(name, raw, type));
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
)(Screen);