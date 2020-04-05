import { makeSelectNeurons } from '../selectors';

describe('makeSelectNeurons', () => {
  const neuronsSelector = makeSelectNeurons();
  it('should select the neurons state', () => {
    const mockedState = {
      neurons: {},
    };
    expect(neuronsSelector(mockedState)).toEqual({});
  });
});
