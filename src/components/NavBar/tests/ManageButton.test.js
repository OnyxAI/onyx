import React from 'react';
import { shallow } from 'enzyme';
import { ManageButton, ManageIcon } from '../ManageButton';

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
        selected={buttonNumber}
      />,
    );

    expect(wrapper.find('button').hasClass('sub-circle-manage')).toBe(true);

    wrapper.find('input').simulate('change');

    expect(onChangeManage).toHaveBeenCalled();
  });
});

describe('Nav ManageIcon', () => {
  it('Should render the manage button', () => {
    const buttonNumber = '3';
    const onChangeManage = jest.fn();
    const onChangeNavCustomIcon = jest.fn();
    const onChangeButton = jest.fn();
    const onManage = true;

    const wrapper = shallow(
      <ManageIcon
        buttonNumber={buttonNumber}
        onChangeManage={onChangeManage}
        onManage={onManage}
        selected={buttonNumber}
        currentIcon="fa fa-home"
        onChangeNavCustomIcon={onChangeNavCustomIcon}
        onChangeButton={onChangeButton}
        user={{ color: 'blue' }}
        customIconInput="fa fa-user"
        language="fr-FR"
      />,
    );

    expect(wrapper.exists('Modal')).toBe(true);

    wrapper
      .find('Modal')
      .props()
      .options.onOpenStart();

    expect(onChangeNavCustomIcon).toHaveBeenCalled();

    wrapper.find('form').simulate('submit');

    expect(onChangeButton).toHaveBeenCalled();
  });
});
