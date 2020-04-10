/**
 * Testing the MainPage
 */

import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../index';

describe('<Home />', () => {
  it('should render the Page Home text', () => {
    shallow(<Home />);
  });
});
