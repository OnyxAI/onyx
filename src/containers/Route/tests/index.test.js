import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import { verifyToken } from '../actions';

import Normal from '../routeType/normal';
import UserConnected from '../routeType/user_connected';
import AdminConnected from '../routeType/admin_connected';
import NotConnected from '../routeType/not_connected';

import OnyxRoute from '../index';

describe('<Register />', () => {
  let store;
  let Component;

  beforeEach(() => {
    store = configureStore({}, history);
    Component = renderer.create(<div>Test</div>);

    store.dispatch = jest.fn();
  });

  it('should call normal container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="normal"
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(Normal).props.path).toBe('/test');
  });

  it('should call not_connected container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="not_connected"
              isAuthenticated={false}
              isAuthenticating={false}
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(NotConnected).props.path).toBe('/test');

    container.update();

    expect(store.dispatch).toHaveBeenCalledWith(verifyToken());
  });

  it('should call user_connected container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="user_connected"
              isAuthenticated
              isAuthenticating={false}
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(UserConnected).props.path).toBe('/test');

    container.update();

    expect(store.dispatch).toHaveBeenCalledWith(verifyToken());
  });

  it('should call admin_connected container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="admin_connected"
              isAuthenticated
              isAuthenticating={false}
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(AdminConnected).props.path).toBe('/test');

    container.update();

    expect(store.dispatch).toHaveBeenCalledWith(verifyToken());
  });

  it('should call default container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="default"
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(Normal).props.path).toBe('/test');
  });
});
