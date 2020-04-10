/**
 * Testing the MainPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { Main, mapDispatchToProps } from '../index';

describe('<Main />', () => {
  it('should render the Page Main text', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <Main />
      </IntlProvider>,
    );
    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should dispatch dispatch', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toStrictEqual({ dispatch });
  });
});
