import { makeSelectWidgets } from '../selectors';

describe('makeSelectWidgets', () => {
  const widgetsSelector = makeSelectWidgets();
  it('should select the widgets', () => {
    const mockedState = {
      widgets: {},
    };
    expect(widgetsSelector(mockedState)).toEqual({});
  });
});
