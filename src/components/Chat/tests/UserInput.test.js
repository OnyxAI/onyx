import React from 'react';
import { shallow } from 'enzyme';
import UserInput from '../UserInput';

describe('Chat UserInput', () => {
  it('Should render UserInput', () => {
    const props = {
      onSubmit: jest.fn(),
      onFilesSelected: jest.fn(),
      showEmoji: true,
    };

    const wrapper = shallow(<UserInput {...props} />);

    expect(wrapper.find('form').hasClass('sc-user-input')).toBe(true);
  });
});
