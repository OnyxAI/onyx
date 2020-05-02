/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * Screen
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-materialize';
import { getLogo } from '@onyx/utils/colors';
import { Link } from 'react-router-dom';
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

import { Responsive, WidthProvider } from 'react-grid-layout';

import {
  getScreen,
  getScreenStore,
  addScreen,
  deleteScreen,
  onChangeScreen,
  setScreen,
  manageScreen,
} from './actions';
import { makeSelectScreen } from './selectors';

import saga from './saga';
import reducer from './reducer';
import messages from './messages';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
  setScreenFunc,
  manageScreenFunc,
}) {
  useInjectReducer({ key: 'screen', reducer });
  useInjectSaga({ key: 'screen', saga });
  useInjectSaga({ key: 'auth', saga: userSaga });

  const [state, setState] = useState({
    currentBreakpoint: 'lg',
    compactType: 'horizontal',
    mounted: false,
  });

  useInterval(() => {
    refreshTokenFunc();
  }, 300000);

  useEffect(() => {
    setState({ ...state, mounted: true });
    getScreenStoreFunc();
    getScreenFunc();
  }, [0]);

  const onBreakpointChange = breakpoint => {
    setState({
      ...state,
      currentBreakpoint: breakpoint,
    });
  };

  const onLayoutChange = (layout, layouts) => {
    setScreenFunc(JSON.stringify(layouts));
  };

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
            <img alt="Logo" className="screen-logo" src={getLogo(user.color)} />
          </Link>

          <div className="screen-manage">
            <button
              type="button"
              className={`btn-floating btn-large ${
                screen.manage ? 'red' : user.color
              }`}
              onClick={() => manageScreenFunc()}
            >
              <i
                className="fa fa-wrench"
                style={{
                  fontSize: '15px',
                  color: 'white',
                  position: 'relative',
                }}
              />
            </button>
          </div>

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
                          onChangeScreenFunc(
                            item.name,
                            item.raw,
                            item.type,
                            item.beautifulName,
                            JSON.stringify(item.defaultLayout),
                          )
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
            <ResponsiveGridLayout
              className="layout screen-container"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              rowHeight={30}
              layouts={JSON.parse(screen.layouts)}
              onLayoutChange={onLayoutChange}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              onBreakpointChange={onBreakpointChange}
              isDraggable={screen.manage}
              isResizable={screen.manage}
              measureBeforeMount={false}
              useCSSTransforms={state.mounted}
              preventCollision={!state.compactType}
            >
              {screen.screen.map((element, key) => {
                if (element.type === 'neuron') {
                  return (
                    <Div
                      key={`${element.name}_${key.toString()}`}
                      data-grid={JSON.parse(element.defaultLayout)}
                      className={screen.manage && 'manageScreen'}
                      deleteScreenFunc={deleteScreenFunc}
                      element={element}
                      user={user}
                    >
                      <button
                        type="button"
                        className={`btn btn-floating btn-small ${!screen.manage &&
                          'hidden'}`}
                        style={{
                          zIndex: 1000,
                          fontSize: '10px',
                          cursor: 'pointer',
                          position: 'absolute',
                          backgroundColor: 'black',
                          right: '0',
                        }}
                        onClick={() => deleteScreenFunc(element.id)}
                      >
                        <i className="fas fa-times" />
                      </button>

                      <i
                        className={`fas fa-chevron-down fa-rotate-45 ${!screen.manage &&
                          'hidden'}`}
                        style={{
                          zIndex: 1000,
                          fontSize: '30px',
                          cursor: 'pointer',
                          position: 'absolute',
                          color: 'black',
                          right: '0',
                          bottom: '0',
                        }}
                      />
                    </Div>
                  );
                }
                return (
                  <Widget
                    title={screen.name}
                    key={key.toString()}
                    data-grid={JSON.parse(screen.defaultLayout)}
                    delete={() => deleteScreenFunc(screen.id)}
                  >
                    <p>Content</p>
                  </Widget>
                );
              })}
            </ResponsiveGridLayout>
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

export function Div(props) {
  return (
    <div {...props}>
      {props.children}

      <GetScreen
        neuronSettings={{
          url: `/api/neurons/serve/${props.element.raw}/remoteEntry.js`,
          scope: props.element.raw,
          module: props.element.name,
        }}
        deleteWidget={() => props.deleteScreenFunc(props.element.id)}
        user={props.user}
        {...props}
      />
    </div>
  );
}

Div.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
  element: PropTypes.object,
  deleteScreenFunc: PropTypes.func,
};

GetScreen.propTypes = {
  neuronSettings: PropTypes.object,
  url: PropTypes.string,
  scope: PropTypes.string,
  module: PropTypes.string,
};

Screen.propTypes = {
  refreshTokenFunc: PropTypes.func,
  setScreenFunc: PropTypes.func,
  manageScreenFunc: PropTypes.func,
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
    manageScreenFunc: () => {
      dispatch(manageScreen());
    },
    refreshTokenFunc: () => {
      dispatch(refreshToken());
    },
    setScreenFunc: layouts => {
      dispatch(setScreen(layouts));
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
    onChangeScreenFunc: (name, raw, type, beautifulName, defaultLayout) => {
      dispatch(onChangeScreen(name, raw, type, beautifulName, defaultLayout));
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
