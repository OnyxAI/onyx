import React from 'react';
import { shallow } from 'enzyme';
import Buttons from '../Buttons';

describe('Nav Buttons', () => {
  it('Should render Buttons with good buttonNumber', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const addNavFunc = jest.fn();
    const onChangeNavColor = jest.fn();
    const onChangeNavUrl = jest.fn();
    const onChangeNavIcon = jest.fn();
    const onChangeManage = jest.fn();
    const onManage = true;
    const icon = 'test';
    const url = 'test';
    const color = 'test';
    const buttonNumber = '3';
    const language = 'test';

    const wrapper = shallow(
      <Buttons
        nav={nav}
        addNavFunc={addNavFunc}
        onChangeManage={onChangeManage}
        onChangeNavColor={onChangeNavColor}
        onChangeNavIcon={onChangeNavIcon}
        onChangeNavUrl={onChangeNavUrl}
        onManage={onManage}
        icon={icon}
        url={url}
        color={color}
        buttonNumber={buttonNumber}
        language={language}
      />,
    );

    expect(wrapper.equals(<div />)).toBe(false);
  });

  it('Should render Buttons with wrong buttonNumber', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const addNavFunc = jest.fn();
    const onChangeNavColor = jest.fn();
    const onChangeNavUrl = jest.fn();
    const onChangeNavIcon = jest.fn();
    const onChangeManage = jest.fn();
    const onManage = true;
    const icon = 'test';
    const url = 'test';
    const color = 'test';
    const buttonNumber = '2';
    const language = 'test';

    const wrapper = shallow(
      <Buttons
        nav={nav}
        addNavFunc={addNavFunc}
        onChangeManage={onChangeManage}
        onChangeNavColor={onChangeNavColor}
        onChangeNavIcon={onChangeNavIcon}
        onChangeNavUrl={onChangeNavUrl}
        onManage={onManage}
        icon={icon}
        url={url}
        color={color}
        buttonNumber={buttonNumber}
        language={language}
      />,
    );

    expect(wrapper.equals(<div />)).toBe(true);
  });
});
