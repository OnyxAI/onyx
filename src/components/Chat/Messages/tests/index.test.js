import React from 'react';
import { shallow } from 'enzyme';
import Message from '../index';

describe('Chat Message', () => {
  it('Should render a Message', () => {
    const message = {
      type: 'text',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);
    expect(wrapper.find('.sc-message').length).toBe(1);
  });

  it('Should select if a message is by me or not', () => {
    const message = {
      type: 'text',
      author: 'me',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .hasClass('sent'),
    ).toBe(true);
  });

  it('Should render a text message', () => {
    const message = {
      type: 'text',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);

    expect(wrapper.exists('TextMessage')).toBe(true);
  });

  it('Should render a emoji message', () => {
    const message = {
      type: 'emoji',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);

    expect(wrapper.exists('EmojiMessage')).toBe(true);
  });

  it('Should render a file message', () => {
    const message = {
      type: 'file',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);

    expect(wrapper.exists('FileMessage')).toBe(true);
  });

  it('Should render a file message', () => {
    const message = {
      type: 'fail',
    };
    const wrapper = shallow(<Message message={message} color="blue" />);

    expect(wrapper.exists('TextMessage')).toBe(false);
  });
});
