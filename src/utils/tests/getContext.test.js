import { ReactReduxContext } from 'react-redux';
import { Context } from '../getContext';

describe('getContext', () => {
  it('should return the react context', () => {
    expect(Context).toBe(ReactReduxContext);
  });
});
