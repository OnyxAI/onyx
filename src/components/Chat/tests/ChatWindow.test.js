import React from 'react';
import { shallow } from 'enzyme';
import ChatWindow from '../ChatWindow';

describe('Chat ChatWindow', () => {
  it('Should render ChatWindow', () => {
    const props = {
      color: 'blue',
      agentProfile: {},
      isOpen: true,
      onClose: jest.fn(),
      onFilesSelected: jest.fn(),
      onUserInputSubmit: jest.fn(),
      showEmoji: true,
      messageList: [],
    };
    const wrapper = shallow(<ChatWindow {...props} />);

    expect(wrapper.find('div').hasClass('sc-chat-window')).toBe(true);
  });

  it('Should render ChatWindow with User submit', () => {
    const props = {
      color: 'blue',
      agentProfile: {},
      isOpen: true,
      onClose: jest.fn(),
      onFilesSelected: jest.fn(),
      onUserInputSubmit: jest.fn(),
      showEmoji: true,
      messageList: [],
    };
    const wrapper = shallow(<ChatWindow {...props} />);

    wrapper.find('UserInput').simulate('submit');

    expect(props.onUserInputSubmit).toHaveBeenCalled();
  });

  it('Should render ChatWindow with File Selected', () => {
    const props = {
      color: 'blue',
      agentProfile: {},
      isOpen: true,
      onClose: jest.fn(),
      onFilesSelected: jest.fn(),
      onUserInputSubmit: jest.fn(),
      showEmoji: true,
      messageList: [],
    };
    const wrapper = shallow(<ChatWindow {...props} />);

    wrapper.find('UserInput').prop('onFilesSelected')();

    expect(props.onFilesSelected).toHaveBeenCalled();
  });

  it('Should render ChatWindow without Message List', () => {
    const props = {
      color: 'blue',
      agentProfile: {},
      isOpen: true,
      onClose: jest.fn(),
      onFilesSelected: jest.fn(),
      onUserInputSubmit: jest.fn(),
      showEmoji: true,
    };
    const wrapper = shallow(<ChatWindow {...props} />);

    expect(wrapper.find('MessageList').prop('messages')).not.toBe([{}]);
  });

  it('Should render ChatWindow closed', () => {
    const props = {
      color: 'blue',
      agentProfile: {},
      isOpen: false,
      onClose: jest.fn(),
      onFilesSelected: jest.fn(),
      onUserInputSubmit: jest.fn(),
      showEmoji: true,
    };
    const wrapper = shallow(<ChatWindow {...props} />);

    expect(wrapper.find('div').hasClass('closed')).toBe(true);
  });
});
