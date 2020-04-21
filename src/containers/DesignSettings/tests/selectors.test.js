import {
  makeSelectColor,
  makeSelectMode,
  selectDesignSettingsDomain,
} from '../selectors';

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

describe('makeSelectMode', () => {
  const modeSelector = makeSelectMode();
  it('should select the mode', () => {
    const mode = 'light';
    const mockedState = {
      designSettings: {
        mode,
      },
    };
    expect(modeSelector(mockedState)).toEqual(mode);
  });
});
