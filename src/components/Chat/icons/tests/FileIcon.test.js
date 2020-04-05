import React from 'react';
import { shallow } from 'enzyme';
import FileIcon from '../FileIcon';

describe('Chat FileIcon', () => {
  const onClick = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();

  it('Should render the FileIcon component', () => {
    const wrapper = shallow(
      <FileIcon onClick={onClick} onBlur={onBlur} onFocus={onFocus} />,
    );
    expect(
      wrapper.find('button').hasClass('sc-user-input--file-icon-wrapper'),
    ).toBe(true);
  });

  it('Should render the FileIcon component simulate click', () => {
    const wrapper = shallow(
      <FileIcon onClick={onClick} onBlur={onBlur} onFocus={onFocus} />,
    );
    wrapper.find('button').simulate('click', {
      preventDefault: () => {},
    });

    expect(onClick).toHaveBeenCalled();
  });
});
