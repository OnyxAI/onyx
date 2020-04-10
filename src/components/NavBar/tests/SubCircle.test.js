import React from 'react';
import { shallow, mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import SubCircle from '../SubCircle';

describe('Nav SubCircle', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

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

  it('Should changeNavIcon', () => {
    wrapper.setProps({ url: '' });
    wrapper.find('option').simulate('click');
    expect(onChangeNavIcon).toHaveBeenCalled();
  });

  it('Should submit the form', () => {
    wrapper.setProps({ url: '' });
    wrapper.find('form').simulate('submit');
    expect(addNavFunc).toHaveBeenCalled();
  });

  it('Should render everything', () => {
    const mounted = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
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
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(mounted.exists('Modal')).toBe(true);
  });

  it('Should check if url is undefined', () => {
    const mounted = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
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
              icon={icon}
              language={language}
              allRoutes={allRoutes}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(mounted.exists('Link')).toBe(true);
  });
});
