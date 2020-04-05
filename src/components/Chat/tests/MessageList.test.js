import React from 'react';
import { shallow } from 'enzyme';
import MessageList from '../MessageList';

describe('Chat MessageList', () => {
  it('Should render Message List', () => {
    const props = {
      color: 'blue',
      messages: [{}, {}],
    };
    const wrapper = shallow(<MessageList {...props} />);
    expect(wrapper.find('div').hasClass('sc-message-list')).toBe(true);
  });
});
