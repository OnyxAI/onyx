/* eslint-disable react/no-children-prop */
import React from 'react';
import { shallow } from 'enzyme';
import PopupWindow from '../PopupWindow';

describe('Chat PopupWindow', () => {
  const onClickedOutside = jest.fn();
  const onInputChange = jest.fn();
  const children = {};

  it('Should render PopupWindow', () => {
    const isOpen = true;
    const wrapper = shallow(
      <PopupWindow
        onClickedOutside={onClickedOutside}
        onInputChange={onInputChange}
        children={children}
        isOpen={isOpen}
      />,
    );

    expect(
      wrapper
        .find('div')
        .at(0)
        .hasClass('sc-popup-window'),
    ).toBe(true);
  });
});
