import React from 'react';
import { shallow } from 'enzyme';
import TextMessage from '../TextMessage';

describe('Chat FileMessage', () => {
  it('Should render FileMessage', () => {
    const props = {
      color: 'blue',
      message: {
        author: 'Aituglo',
        data: {
          text: 'Hello',
        },
      },
    };
    const wrapper = shallow(<TextMessage {...props} />);

    expect(wrapper.find('div').hasClass('sc-message--text darken-1')).toBe(
      true,
    );
  });

  it('Should change color for me user', () => {
    const props = {
      color: 'blue',
      message: {
        author: 'me',
        data: {
          text: 'Hello',
        },
      },
    };
    const wrapper = shallow(<TextMessage {...props} />);

    expect(wrapper.find('div').hasClass('blue')).toBe(true);
  });

  it('Should change color for onyx user', () => {
    const props = {
      color: 'blue',
      message: {
        author: 'onyx',
        data: {
          text: 'Hello',
        },
      },
    };
    const wrapper = shallow(<TextMessage {...props} />);

    expect(wrapper.find('div').hasClass('secondary')).toBe(true);
  });
});
