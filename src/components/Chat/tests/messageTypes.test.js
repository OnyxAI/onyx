import { messageTypes } from '../messageTypes';

describe('Chat messageTypes', () => {
  it('Should render snapshot', () => {
    expect(messageTypes).toMatchSnapshot();
  });
});
