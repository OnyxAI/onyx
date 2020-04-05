import React from 'react';
import { shallow } from 'enzyme';
import Chat from '../index';

describe('Chat index', () => {
  const user = {
    color: 'blue',
  };
  const wrapper = shallow(<Chat sockyx={{}} user={user} />);

  it('Should render the component', () => {
    expect(wrapper.find('div').hasClass('chat-wrapper')).toBe(true);
  });
});
