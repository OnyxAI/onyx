import { makeSelectScreen } from '../selectors';

describe('makeSelectScreen', () => {
  const screenSelector = makeSelectScreen();
  it('should select the screen', () => {
    const mockedState = {
      screen: {},
    };
    expect(screenSelector(mockedState)).toEqual({});
  });
});
