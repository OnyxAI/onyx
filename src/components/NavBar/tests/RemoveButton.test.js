import React from 'react';
import { shallow } from 'enzyme';
import RemoveButtons from '../RemoveButtons';

describe('Nav RemoveButton', () => {
  it('Should render RemoveButton with good buttonNumber', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const onManage = true;
    const removeNavFunc = jest.fn();
    const buttonNumber = '3';

    const wrapper = shallow(
      <RemoveButtons
        nav={nav}
        selected={buttonNumber}
        removeNavFunc={removeNavFunc}
        onManage={onManage}
        buttonNumber={buttonNumber}
      />,
    );

    expect(wrapper.equals(<div />)).toBe(false);
  });

  it('Should render RemoveButton with wrong buttonNumber', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const onManage = true;
    const removeNavFunc = jest.fn();
    const buttonNumber = '2';

    const wrapper = shallow(
      <RemoveButtons
        nav={nav}
        selected={buttonNumber}
        removeNavFunc={removeNavFunc}
        onManage={onManage}
        buttonNumber={buttonNumber}
      />,
    );

    expect(wrapper.equals(<div />)).toBe(true);
  });

  it('Should render RemoveButton without manage active', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const onManage = false;
    const removeNavFunc = jest.fn();
    const buttonNumber = '3';

    const wrapper = shallow(
      <RemoveButtons
        nav={nav}
        selected={buttonNumber}
        removeNavFunc={removeNavFunc}
        onManage={onManage}
        buttonNumber={buttonNumber}
      />,
    );

    expect(wrapper.equals(<div />)).toBe(true);
  });

  it('Should render RemoveButton with simulate click', () => {
    const nav = [
      {
        buttonNumber: '1',
      },
      {
        buttonNumber: '3',
      },
    ];
    const onManage = true;
    const removeNavFunc = jest.fn();
    const buttonNumber = '3';

    const wrapper = shallow(
      <RemoveButtons
        nav={nav}
        selected={buttonNumber}
        removeNavFunc={removeNavFunc}
        onManage={onManage}
        buttonNumber={buttonNumber}
      />,
    );

    wrapper.find('button').simulate('click');

    expect(removeNavFunc).toHaveBeenCalled();
  });
});
