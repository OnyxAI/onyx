import React from 'react';
import { shallow } from 'enzyme';
import SubCircle from '../SubCircle';

describe('Nav SubCircle', () => {
  const position = 'test';
  const buttonNumber = 'test';
  const addNavFunc = jest.fn();
  const onChangeNavColor = jest.fn();
  const onChangeNavUrl = jest.fn();
  const onChangeNavIcon = jest.fn();
  const colorInput = 'test';
  const urlInput = 'test';
  const iconInput = 'test';
  const color = 'test';
  const classColor = 'test';
  const icon = 'test';
  const language = 'en-US';
  const url = '';
  const allRoutes = [
    {
      url: '/test',
      icon: 'test',
      color: 'blue',
    },
  ];

  const wrapper = shallow(
    <SubCircle
      position={position}
      buttonNumber={buttonNumber}
      addNavFunc={addNavFunc}
      onChangeNavColor={onChangeNavColor}
      onChangeNavUrl={onChangeNavUrl}
      onChangeNavIcon={onChangeNavIcon}
      colorInput={colorInput}
      urlInput={urlInput}
      iconInput={iconInput}
      color={color}
      classColor={classColor}
      url={url}
      icon={icon}
      language={language}
      allRoutes={allRoutes}
    />,
  );

  it('Should render the modal if the url is empty', () => {
    expect(wrapper.exists('Modal')).toBe(true);
  });

  it('Should render the link if the url is not empty', () => {
    wrapper.setProps({ url: 'url' });
    expect(wrapper.exists('Link')).toBe(true);
  });

  it('Should submit the form', () => {
    wrapper.setProps({ url: '' });
    wrapper.find('form').simulate('submit');
    expect(addNavFunc).toHaveBeenCalled();
  });
});
