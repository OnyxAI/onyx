import React from 'react';
import { shallow } from 'enzyme';
import Launcher, { MessageCount } from '../Launcher';

describe('Chat Launcher', () => {
  const props = {
    color: 'blue',
    onMessageWasSent: jest.fn(),
    agentProfile: {},
    onFilesSelected: [],
    newMessagesCount: 0,
    isOpen: false,
    handleClick: jest.fn(),
    messageList: [],
    mute: false,
    showEmoji: true,
  };

  const wrapper = shallow(<Launcher {...props} />);
  it('Should render the launcher', () => {
    expect(
      wrapper
        .find('div')
        .at(1)
        .hasClass('sc-launcher'),
    ).toBe(true);
  });

  it('Should open the launcher', () => {
    wrapper.find('ChatWindow').simulate('close');
    expect(wrapper.find('ChatWindow').props().isOpen).toBe(true);
  });

  it('Should return message count', () => {
    const messageProps = {
      count: 1,
      isOpen: false,
    };

    const countWrapper = shallow(<MessageCount {...messageProps} />);

    expect(countWrapper.find('div').hasClass('sc-new-messages-count')).toBe(
      true,
    );
  });

  it('Should not return message count', () => {
    const messageProps = {
      count: 1,
      isOpen: true,
    };

    const countWrapper = shallow(<MessageCount {...messageProps} />);

    expect(countWrapper.find('div').length).toBe(0);
  });
});
