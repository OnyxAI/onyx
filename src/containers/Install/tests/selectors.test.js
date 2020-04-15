import { makeSelectInstall } from '../selectors';

describe('makeSelectInstall', () => {
  const installSelector = makeSelectInstall();
  it('should select the install', () => {
    const mockedState = {
      install: {},
    };
    expect(installSelector(mockedState)).toEqual({});
  });
});
