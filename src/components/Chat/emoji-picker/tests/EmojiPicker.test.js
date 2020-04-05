import React from 'react';
import { shallow } from 'enzyme';
import EmojiPicker from '../EmojiPicker';

describe('Chat EmojiPicker', () => {
  const onEmojiPicked = jest.fn();
  const filter = 'eye';
  const wrapper = shallow(
    <EmojiPicker onEmojiPicked={onEmojiPicked} filter={filter} />,
  );

  it('Should render EmojiPicker', () => {
    expect(wrapper.find('.sc-emoji-picker').length).toBe(1);
  });

  it('Simulate Click', () => {
    wrapper
      .find('.sc-emoji-picker--emoji')
      .at(0)
      .simulate('click');
    expect(onEmojiPicked).toHaveBeenCalled();
  });
});
