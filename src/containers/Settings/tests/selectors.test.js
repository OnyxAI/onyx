import { makeSelectSettings } from '../selectors';

describe('makeSelectSettings', () => {
  const settingsSelector = makeSelectSettings();
  it('should select the settings', () => {
    const mockedState = {
      settings: {},
    };
    expect(settingsSelector(mockedState)).toEqual({});
  });
});
