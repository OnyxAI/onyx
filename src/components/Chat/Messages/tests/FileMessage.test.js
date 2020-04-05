import React from 'react';
import { shallow } from 'enzyme';
import FileMessage from '../FileMessage';

describe('Chat FileMessage', () => {
  it('Should render FileMessage', () => {
    const props = {
      data: {
        url: 'http:testurl',
        filename: 'file.txt',
      },
    };
    const wrapper = shallow(<FileMessage {...props} />);

    expect(wrapper.find('a').hasClass('sc-message--file')).toBe(true);
  });
});
