import { makeSelectColor, selectDesignSettingsDomain } from '../selectors';

describe('selectDesignSettingsDomain', () => {
  it('should select the designSettings state', () => {
    const designSettingsState = {
      userData: {},
    };
    const mockedState = {
      designSettings: designSettingsState,
    };
    expect(selectDesignSettingsDomain(mockedState)).toEqual(
      designSettingsState,
    );
  });
});

describe('makeSelectColor', () => {
  const colorSelector = makeSelectColor();
  it('should select the color', () => {
    const color = 'blue';
    const mockedState = {
      designSettings: {
        color,
      },
    };
    expect(colorSelector(mockedState)).toEqual(color);
  });
});
