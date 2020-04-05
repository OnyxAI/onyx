import React from 'react';
import { shallow } from 'enzyme';
import EmojiMessage from '../EmojiMessage';

describe('Chat EmojiMessage', () => {
  it('Should render the EmojiMessage component', () => {
    const props = {
      data: {
        emoji: 'happy',
      },
    };

    const wrapper = shallow(<EmojiMessage {...props} />);
    expect(wrapper.find('div').hasClass('sc-message--emoji')).toBe(true);
  });
});
