import makeSelectNav, { selectNavDomain } from '../selectors';

describe('selectNavDomain', () => {
  it('should select the nav state', () => {
    const navState = {
      userData: {},
    };
    const mockedState = {
      nav: navState,
    };
    expect(selectNavDomain(mockedState)).toEqual(navState);
  });
});

describe('makeSelectNav', () => {
  const navSelector = makeSelectNav();
  it('should select the nav', () => {
    const nav = {};
    const mockedState = {
      nav: {},
    };
    expect(navSelector(mockedState)).toEqual(nav);
  });
});
