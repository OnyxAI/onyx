import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
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

import OnyxRoute, { mapDispatchToProps } from '../index';

describe('<OnyxRoute />', () => {
  let store;
  let Component;
  let NeuronComponent;

  // Fixtures
  const NeuComponent = () => null;

  const reducer = s => (s !== undefined ? s : null);

  const reducers = { key: 'test', reducer };

  const sagas = {
    key: 'test',
    saga: jest.fn(),
  };

  function dispatchToProps(dispatch) {
    return {
      test: () => dispatch('test'),
    };
  }

  function mapStateToProps(state) {
    return state;
  }

  beforeEach(() => {
    store = configureStore({}, history);
    Component = renderer.create(<div>Test</div>);

    store.dispatch = jest.fn();

    NeuronComponent = {
      mapDispatchToProps: dispatchToProps,
      mapStateToProps,
      reducers,
      sagas,
      component: NeuComponent,
    };
  });

  it('should logout the user', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).logoutUserFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/auth/LOGOUT_USER',
    });
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
            <div id="app">
              <OnyxRoute
                container={Component}
                containerType="native"
                routeType="user_connected"
                isAuthenticated
                isAuthenticating={false}
                path="/test"
              />
            </div>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(UserConnected).props.path).toBe('/test');

    container.update();

    expect(store.dispatch).toHaveBeenCalledWith(verifyToken());
  });

  it('should call user_connected neuron container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <div id="app">
              <OnyxRoute
                container={NeuronComponent}
                containerType="neuron"
                routeType="user_connected"
                isAuthenticated
                isAuthenticating={false}
                path="/test"
              />
            </div>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.root.findByType(UserConnected).props.path).toBe('/test');

    container.update();

    expect(store.dispatch).toHaveBeenCalledWith(verifyToken());
  });

  it('should call admin_connected container', () => {
    const container = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <OnyxRoute
              container={Component}
              containerType="native"
              routeType="admin_connected"
              user={{ account_type: 1, language: 'fr-FR' }}
              isAuthenticated
              isAuthenticating={false}
              path="/test"
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container.find(AdminConnected).props().path).toBe('/test');
  });

  it('should call admin_connected neuron container', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <div id="app">
              <OnyxRoute
                container={NeuronComponent}
                containerType="neuron"
                routeType="admin_connected"
                user={{ account_type: 1, language: 'fr-FR' }}
                isAuthenticated
                isAuthenticating={false}
                path="/test"
              />
            </div>
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
