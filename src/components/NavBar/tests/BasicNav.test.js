import React from 'react';
import { shallow } from 'enzyme';
import BasicNav from '../BasicNav';

describe('Nav BasicNav', () => {
  it('Should render BasicNav', () => {
    const user = {};
    const logoutUserFunc = jest.fn();
    const wrapper = shallow(
      <BasicNav user={user} logoutUserFunc={logoutUserFunc} />,
    );

    expect(wrapper.find('div').hasClass('uk-hidden@xl')).toBe(true);
  });

  it('Should render BasicNav simulate logout', () => {
    const user = {};
    const logoutUserFunc = jest.fn();
    const wrapper = shallow(
      <BasicNav user={user} logoutUserFunc={logoutUserFunc} />,
    );

    wrapper
      .find('NavItem')
      .last()
      .simulate('click');

    expect(logoutUserFunc).toHaveBeenCalled();
  });
});
