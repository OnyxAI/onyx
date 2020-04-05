import React from 'react';
import { shallow } from 'enzyme';
import SendIcon from '../SendIcon';

describe('Chat SendIcon', () => {
  const onClick = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();

  it('Should render the SendIcon component', () => {
    const wrapper = shallow(
      <SendIcon onClick={onClick} onBlur={onBlur} onFocus={onFocus} />,
    );
    expect(
      wrapper.find('button').hasClass('sc-user-input--send-icon-wrapper'),
    ).toBe(true);
  });

  it('Should render the SendIcon component simulate click', () => {
    const wrapper = shallow(
      <SendIcon onClick={onClick} onBlur={onBlur} onFocus={onFocus} />,
    );
    wrapper.find('button').simulate('click', {
      preventDefault: () => {},
    });

    expect(onClick).toHaveBeenCalled();
  });
});
