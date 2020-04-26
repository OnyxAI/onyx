/**
 * Testing the Screen Page
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Screen, mapDispatchToProps } from '../index';

describe('<Screen />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const getScreenStoreFunc = jest.fn();
  const getScreenFunc = jest.fn();
  const addScreenFunc = jest.fn();
  const deleteScreenFunc = jest.fn();
  const onChangeScreenFunc = jest.fn();
  const user = { language: 'en-US' };

  it('should render the Page Screen', () => {
    const screen = { screenStore: [] };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('div')).toBe(true);
  });

  it('should render the Page Screen testing store', () => {
    const screen = { screenStore: [], loadingScreenStore: false };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('option')
      .first()
      .simulate('click');

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(onChangeScreenFunc).toHaveBeenCalled();
    expect(addScreenFunc).toHaveBeenCalled();
  });

  it('should render the Page Screen testing store with screen', () => {
    const screen = {
      screenStore: [
        { name: 'name', raw: 'raw', type: 'neuron', beautifulName: 'Name' },
      ],
      loadingScreenStore: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );

    wrapper
      .find('option')
      .at(1)
      .simulate('click');

    expect(onChangeScreenFunc).toHaveBeenCalled();
  });

  it('should render the Page Screen with screen', () => {
    const screen = {
      screenStore: [],
      loadingScreenStore: false,
      screen: [
        {
          name: 'name',
          raw: 'raw',
          type: 'neuron',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('GetScreen')
      .first()
      .props()
      .deleteWidget();

    expect(deleteScreenFunc).toHaveBeenCalled();
  });

  it('should render the Page Screen with screen', () => {
    const screen = {
      screenStore: [],
      loadingScreenStore: true,
      screen: [
        {
          name: 'name',
          raw: 'raw',
          type: 'native',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('Widget')
      .first()
      .props()
      .delete();

    expect(deleteScreenFunc).toHaveBeenCalled();
  });

  it('should render the Page Screen with screen', () => {
    const screen = {
      screenStore: [],
      loadingScreenStore: true,
      screen: [],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Screen
              getScreenStoreFunc={getScreenStoreFunc}
              getScreenFunc={getScreenFunc}
              addScreenFunc={addScreenFunc}
              deleteScreenFunc={deleteScreenFunc}
              onChangeScreenFunc={onChangeScreenFunc}
              screen={screen}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should dispatch getScreenStoreFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getScreenStoreFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Screen/GET_SCREEN_STORE',
    });
  });

  it('should dispatch getScreenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getScreenFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Screen/GET_SCREEN',
    });
  });

  it('should dispatch addScreenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addScreenFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Screen/ADD_SCREEN',
    });
  });

  it('should dispatch deleteScreenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteScreenFunc(1);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Screen/DELETE_SCREEN',
      id: 1,
    });
  });

  it('should dispatch onChangeScreenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeScreenFunc('name', 'raw', 'neuron');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Screen/CHANGE_SCREEN',
      name: 'name',
      raw: 'raw',
      screenType: 'neuron',
    });
  });
});
