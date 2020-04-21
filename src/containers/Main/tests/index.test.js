/**
 * Testing the Main Page
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Main, mapDispatchToProps } from '../index';

describe('<Main />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const getWidgetsStoreFunc = jest.fn();
  const getWidgetsFunc = jest.fn();
  const addWidgetFunc = jest.fn();
  const deleteWidgetFunc = jest.fn();
  const onChangeWidgetFunc = jest.fn();
  const user = { language: 'en-US' };

  it('should render the Page Main', () => {
    const widgets = { widgetsStore: [] };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('div')).toBe(true);
  });

  it('should render the Page Main testing store', () => {
    const widgets = { widgetsStore: [], loadingWidgetsStore: false };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
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

    expect(onChangeWidgetFunc).toHaveBeenCalled();
    expect(addWidgetFunc).toHaveBeenCalled();
  });

  it('should render the Page Main testing store with widgets', () => {
    const widgets = {
      widgetsStore: [
        { name: 'name', raw: 'raw', type: 'neuron', beautifulName: 'Name' },
      ],
      loadingWidgetsStore: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );

    wrapper
      .find('option')
      .at(1)
      .simulate('click');

    expect(onChangeWidgetFunc).toHaveBeenCalled();
  });

  it('should render the Page Main with widgets', () => {
    const widgets = {
      widgetsStore: [],
      loadingWidgetsStore: true,
      widgets: [
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
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('GetWidget')
      .first()
      .props()
      .deleteWidget();

    expect(deleteWidgetFunc).toHaveBeenCalled();
  });

  it('should render the Page Main with widgets', () => {
    const widgets = {
      widgetsStore: [],
      loadingWidgetsStore: true,
      widgets: [
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
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('Widget')
      .first()
      .props()
      .delete();

    expect(deleteWidgetFunc).toHaveBeenCalled();
  });

  it('should render the Page Main with widgets', () => {
    const widgets = {
      widgetsStore: [],
      loadingWidgetsStore: true,
      widgets: [],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Main
            getWidgetsStoreFunc={getWidgetsStoreFunc}
            getWidgetsFunc={getWidgetsFunc}
            addWidgetFunc={addWidgetFunc}
            deleteWidgetFunc={deleteWidgetFunc}
            onChangeWidgetFunc={onChangeWidgetFunc}
            widgets={widgets}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should dispatch getWidgetsStoreFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getWidgetsStoreFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Widgets/GET_WIDGETS_STORE',
    });
  });

  it('should dispatch getWidgetsFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getWidgetsFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Widgets/GET_WIDGETS',
    });
  });

  it('should dispatch addWidgetFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addWidgetFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Widgets/ADD_WIDGET',
    });
  });

  it('should dispatch deleteWidgetFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteWidgetFunc(1);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Widgets/DELETE_WIDGET',
      id: 1,
    });
  });

  it('should dispatch onChangeWidgetFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeWidgetFunc('name', 'raw', 'neuron');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Widgets/CHANGE_WIDGET',
      name: 'name',
      raw: 'raw',
      widgetType: 'neuron',
    });
  });
});
