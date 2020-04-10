import React from 'react';
import { shallow } from 'enzyme';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import { Toasts } from '../Toasts';

describe('<Toast />', () => {
  let store;
  const toasts = [
    {
      id: 1,
    },
  ];
  const actions = {
    removeToast: jest.fn(),
  };

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render an <ul> tag', () => {
    const wrapper = shallow(<Toasts actions={actions} toasts={toasts} />);

    expect(wrapper.find('ul').hasClass('toasts')).toBe(true);

    expect(wrapper.exists('Toast')).toBe(true);

    wrapper
      .find('Toast')
      .props()
      .removeToast();

    expect(actions.removeToast).toHaveBeenCalledWith(1);
  });
  /*
  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<Form id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<Form attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
  */
});
