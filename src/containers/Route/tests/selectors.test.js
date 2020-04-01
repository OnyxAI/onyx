import makeSelectCurrentUser, { selectCurrentUserDomain } from '../selectors';

describe('selectCurrentUserDomain', () => {
  it('should select the currentUser state', () => {
    const currentUserState = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: {},
      errorText: '',
    };
    const mockedState = {
      currentUser: currentUserState,
    };
    expect(selectCurrentUserDomain(mockedState)).toEqual(currentUserState);
  });
});

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the currentUser', () => {
    const currentUser = {};
    const mockedState = {
      currentUser: {},
    };
    expect(currentUserSelector(mockedState)).toEqual(currentUser);
  });
});
