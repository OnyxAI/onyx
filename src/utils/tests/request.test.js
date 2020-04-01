/**
 * Test the request function
 */
import axios from 'axios';
import 'whatwg-fetch';
import request from '../request';

jest.mock('axios');

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    axios.mockClear();
  });

  it('should return success status', () => {
    axios.mockResolvedValue({ data: { status: 'success' }, status: 200 });

    return request({ url: 'http://test.test' }).then(json => {
      expect(json.status).toBe('success');
    });
  });

  it('should return 204 status', () => {
    axios.mockResolvedValue({ data: { status: 'error' }, status: 204 });

    return request({ url: 'http://test.test' }).then(json => {
      expect(json).toBe(null);
    });
  });

  it('should catch errors', () => {
    axios.mockResolvedValue({
      data: { status: 'error' },
      status: 404,
      statusText: 'Not Found',
    });

    return request({ url: 'http://test.test' }).catch(err => {
      expect(err.response.status).toBe(404);
      expect(err.response.statusText).toBe('Not Found');
    });
  });
});
