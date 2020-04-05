import React from 'react';
import { shallow } from 'enzyme';
import UserNav from '../UserNav';

describe('Nav UserNav', () => {
  const user = {};
  const logoutUserFunc = jest.fn();

  const wrapper = shallow(
    <UserNav user={user} logoutUserFunc={logoutUserFunc} />,
  );

  it('Should render UserNav', () => {
    expect(
      wrapper
        .find('div')
        .first()
        .hasClass('uk-visible@s'),
    ).toBe(true);
  });

  it('Should simulate logout', () => {
    wrapper
      .find('SideNavItem')
      .last()
      .simulate('click');
    expect(logoutUserFunc).toHaveBeenCalled();
  });

  it('Should check if username is empty', () => {
    wrapper.setProps({ user: { username: 'Aituglo' } });
    expect(wrapper.find('.name').text()).toBe('Aituglo');
  });

  it('Should check if email is empty', () => {
    wrapper.setProps({ user: { email: 'contact@test.fr' } });
    expect(wrapper.find('.email').text()).toBe('contact@test.fr');
  });
});
