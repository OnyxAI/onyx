/**
 * Testing the NeuronsPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Neurons, mapDispatchToProps } from '../index';

describe('<Neurons />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const getNeuronsStoreFunc = jest.fn();
  const installNeuronFunc = jest.fn();
  const removeNeuronFunc = jest.fn();
  const user = {
    mode: 'light',
  }

  it('should render the Page Neurons', () => {
    const neurons = {
      loading: false,
      usingNeuron: 'test',
      neuronsStoreList: [
        {
          raw: 'test',
          url: '/test',
        },
      ],
      neurons: [
        {
          raw_name: 'other',
        },
      ],
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Neurons
            getNeuronsStoreFunc={getNeuronsStoreFunc}
            installNeuronFunc={installNeuronFunc}
            removeNeuronFunc={removeNeuronFunc}
            neurons={neurons}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should render the Page Neurons simulate install', () => {
    const neurons = {
      loading: false,
      usingNeuron: 'test',
      neuronsStoreList: [
        {
          raw: 'test',
          url: '/test',
        },
      ],
      neurons: [
        {
          raw_name: 'other',
        },
      ],
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Neurons
            getNeuronsStoreFunc={getNeuronsStoreFunc}
            installNeuronFunc={installNeuronFunc}
            removeNeuronFunc={removeNeuronFunc}
            neurons={neurons}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');

    expect(installNeuronFunc).toHaveBeenCalledWith('test', '/test');
  });

  it('should render the Page Neurons simulate remove', () => {
    const neurons = {
      loading: false,
      usingNeuron: 'test',
      neuronsStoreList: [
        {
          raw: 'test',
          url: '/test',
        },
      ],
      neurons: [
        {
          raw_name: 'test',
          routes: [
            {
              url: '/test',
              default: 'true',
            },
          ],
        },
      ],
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Neurons
              getNeuronsStoreFunc={getNeuronsStoreFunc}
              installNeuronFunc={installNeuronFunc}
              removeNeuronFunc={removeNeuronFunc}
              neurons={neurons}
              user={user}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');

    expect(removeNeuronFunc).toHaveBeenCalledWith('test');
  });

  it('should render the Page Neurons without neurons', () => {
    const neurons = {
      loading: false,
      usingNeuron: 'test',
      neurons: [
        {
          raw_name: 'test',
        },
      ],
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Neurons
            getNeuronsStoreFunc={getNeuronsStoreFunc}
            installNeuronFunc={installNeuronFunc}
            removeNeuronFunc={removeNeuronFunc}
            neurons={neurons}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(
      wrapper
        .find('span')
        .at(1)
        .hasClass('uk-margin-small-right'),
    ).toBe(true);
  });

  it('should render the Page Neurons loading', () => {
    const neurons = {
      loading: true,
      usingNeuron: 'test',
      neuronsStoreList: [
        {
          raw: 'test',
          url: '/test',
        },
      ],
      neurons: [
        {
          raw_name: 'test',
        },
      ],
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Neurons
            getNeuronsStoreFunc={getNeuronsStoreFunc}
            installNeuronFunc={installNeuronFunc}
            removeNeuronFunc={removeNeuronFunc}
            neurons={neurons}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(
      wrapper
        .find('span')
        .at(1)
        .hasClass('uk-margin-small-right'),
    ).toBe(true);
  });

  it('should dispatch getNeuronsStoreFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getNeuronsStoreFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Neurons/GET_NEURONS_STORE',
    });
  });

  it('should dispatch installNeuronsFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).installNeuronFunc('name', 'url');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Neurons/INSTALL_NEURON',
      name: 'name',
      url: 'url',
    });
  });

  it('should dispatch removeNeuronsFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).removeNeuronFunc('name');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Neurons/REMOVE_NEURON',
      name: 'name',
    });
  });
});
