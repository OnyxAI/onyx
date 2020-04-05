import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Chat Header', () => {
  const props = {
    color: 'blue',
    imageUrl: 'url',
    teamName: 'name',
    onClose: jest.fn(),
  };
  const wrapper = shallow(<Header {...props} />);

  it('Should render Header', () => {
    expect(
      wrapper
        .find('div')
        .at(0)
        .hasClass('sc-header'),
    ).toBe(true);
  });

  it('Should render Header with close click', () => {
    wrapper
      .find('div')
      .at(2)
      .simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });
});
