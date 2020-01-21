/**
 * Test the request function
 */

import 'whatwg-fetch';
import request from '../request';

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response

    it('should format the response correctly', done => {
      const res = new Response(null, {
        status: 204,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
      request({ url: 'https://httpstat.us/204' })
        .catch(done)
        .then(json => {
          expect(json).toBe(null);
          done();
        });
    });

    it('should format the response correctly', done => {
      const res = new Response('{"status":"success"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
      request({ url: 'http://echo.jsontest.com/status/success' })
        .catch(done)
        .then(json => {
          expect(json.status).toBe('success');
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', done => {
      request({
        url: 'https://httpstat.us/404',
      }).catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('Not Found');
        done();
      });
    });

    it('should get error', () => {
      request({ url: 'https://httpstat.us/404' }).then(err => {
        expect(err.response).toBe('Not Found');
        expect(err).toThrow(Error);
      });
    });
  });
});
