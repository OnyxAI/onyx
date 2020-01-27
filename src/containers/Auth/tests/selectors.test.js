import makeSelectAuth, { selectAuthDomain } from '../selectors';

describe('selectAuthDomain', () => {
  it('should select the auth state', () => {
    const authState = {
      email: '',
      password: '',
      verifPassword: '',
      username: '',
      firstname: '',
      lastname: '',
      language: 'en-US',
      isRegistered: false,
      errorText: '',
    };
    const mockedState = {
      auth: authState,
    };
    expect(selectAuthDomain(mockedState)).toEqual(authState);
  });
});

describe('makeSelectAuth', () => {
  const authSelector = makeSelectAuth();
  it('should select the auth', () => {
    const auth = {};
    const mockedState = {
      auth: {},
    };
    expect(authSelector(mockedState)).toEqual(auth);
  });
});
