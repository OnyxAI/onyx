import React from 'react';
import { shallow } from 'enzyme';
import ManageButton from '../ManageButton';

describe('Nav ManageButton', () => {
  it('Should render the manage button', () => {
    const buttonNumber = '3';
    const onChangeManage = jest.fn();
    const onManage = true;

    const wrapper = shallow(
      <ManageButton
        buttonNumber={buttonNumber}
        onChangeManage={onChangeManage}
        onManage={onManage}
      />,
    );

    expect(wrapper.find('button').hasClass('sub-circle-manage')).toBe(true);
  });
});
