/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * Main
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-materialize';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';
import { getMessage } from '@onyx/i18n';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@onyx/components/Container';
import Widget from '@onyx/components/Widget';

import {
  getWidgets,
  getWidgetsStore,
  addWidget,
  deleteWidget,
  onChangeWidget,
} from './actions';
import { makeSelectWidgets } from './selectors';

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

function GetWidget(props) {
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

export function Main({
  user,
  widgets,
  onChangeWidgetFunc,
  getWidgetsFunc,
  getWidgetsStoreFunc,
  addWidgetFunc,
  deleteWidgetFunc,
}) {
  useInjectReducer({ key: 'widgets', reducer });
  useInjectSaga({ key: 'widgets', saga });

  useEffect(() => {
    getWidgetsStoreFunc();
    getWidgetsFunc();
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Main" />
          </Helmet>
        )}
      </FormattedMessage>
      {widgets && (
        <div>
          {!widgets.loadingWidgetsStore && (
            <Modal
              header={getMessage(
                user.language.substring(0, 2),
                messages.modal_header.id,
              )}
              actions={<p />}
              trigger={
                <div className="widget-button">
                  <button
                    type="button"
                    className={`btn-floating btn-large ${user.color}`}
                  >
                    <i
                      className="fa fa-plus"
                      style={{
                        fontSize: '20px',
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
                  <label htmlFor="widget">
                    <FormattedMessage {...messages.widget} />
                  </label>
                  <select
                    name="widget"
                    className="uk-select uk-form-large"
                    value={widgets.widgetName}
                    required
                  >
                    <option
                      value=""
                      onClick={() => onChangeWidgetFunc('', '', '')}
                    >
                      {getMessage(
                        user.language.substring(0, 2),
                        messages.widget.id,
                      )}
                    </option>
                    {widgets.widgetsStore.map((item, index) => (
                      <option
                        key={index.toString()}
                        value={item.name}
                        onClick={() =>
                          onChangeWidgetFunc(item.name, item.raw, item.type)
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
                    onClick={() => addWidgetFunc()}
                  >
                    <FormattedMessage id="onyx.global.send" />
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {widgets.widgets && widgets.widgets.length !== 0 ? (
            <div
              className="uk-grid-medium uk-flex-center uk-padding uk-text-center"
              data-uk-grid
            >
              {widgets.widgets.map(widget => {
                if (widget.type === 'neuron') {
                  return (
                    <GetWidget
                      neuronSettings={{
                        url: `/api/neurons/serve/${widget.raw}/remoteEntry.js`,
                        scope: widget.raw,
                        module: widget.name,
                      }}
                      deleteWidget={() => deleteWidgetFunc(widget.id)}
                      user={user}
                      style={widget.style}
                    />
                  );
                }
                return (
                  <Widget
                    title={widget.name}
                    style={widget.style}
                    delete={() => deleteWidgetFunc(widget.id)}
                  >
                    <p>Content</p>
                  </Widget>
                );
              })}
            </div>
          ) : (
            <Container
              user={user}
              title={<FormattedMessage {...messages.header} />}
            >
              <h4 className="center">
                <FormattedMessage {...messages.no_widgets} />
              </h4>
            </Container>
          )}
        </div>
      )}
    </div>
  );
}

GetWidget.propTypes = {
  neuronSettings: PropTypes.object,
  url: PropTypes.string,
  scope: PropTypes.string,
  module: PropTypes.string,
};

Main.propTypes = {
  user: PropTypes.object,
  widgets: PropTypes.object,
  onChangeWidgetFunc: PropTypes.func,
  getWidgetsFunc: PropTypes.func,
  getWidgetsStoreFunc: PropTypes.func,
  addWidgetFunc: PropTypes.func,
  deleteWidgetFunc: PropTypes.func,
};

export const mapStateToProps = createStructuredSelector({
  widgets: makeSelectWidgets(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getWidgetsFunc: () => {
      dispatch(getWidgets());
    },
    getWidgetsStoreFunc: () => {
      dispatch(getWidgetsStore());
    },
    addWidgetFunc: () => {
      dispatch(addWidget());
    },
    deleteWidgetFunc: id => {
      dispatch(deleteWidget(id));
    },
    onChangeWidgetFunc: (name, raw, type) => {
      dispatch(onChangeWidget(name, raw, type));
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
)(Main);
