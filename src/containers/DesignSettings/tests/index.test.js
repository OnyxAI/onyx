/**
 *
 * Tests for DesignSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import DesignSettings from '../Loadable';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<DesignSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DesignSettings dispatch={dispatch} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
