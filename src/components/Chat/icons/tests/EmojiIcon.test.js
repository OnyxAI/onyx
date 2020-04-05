import React from 'react';
import { shallow } from 'enzyme';
import EmojiIcon from '../EmojiIcon';

describe('Chat EmojiIcon', () => {
  const onClick = jest.fn();
  const tooltip = 'test';

  it('Should render the EmojiIcon component', () => {
    const isActive = true;
    const wrapper = shallow(
      <EmojiIcon onClick={onClick} isActive={isActive} tooltip={tooltip} />,
    );
    expect(wrapper.find('div').hasClass('sc-user-input--picker-wrapper')).toBe(
      true,
    );
  });

  it('Should render the EmojiIcon component with inactive', () => {
    const isActive = false;
    const wrapper = shallow(
      <EmojiIcon onClick={onClick} isActive={isActive} tooltip={tooltip} />,
    );
    expect(wrapper.find('svg').hasClass('active')).toBe(false);
  });
});
