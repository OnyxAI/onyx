import {
  GET_NEURONS,
  GET_NEURONS_ERROR,
  GET_NEURONS_SUCCESS,
} from '../constants';

import { getNeurons, getNeuronsError, getNeuronsSuccess } from '../actions';

describe('Neurons Actions', () => {
  describe('getNeurons', () => {
    it('should return the correct type and the passed getNeurons', () => {
      const expectedResult = {
        type: GET_NEURONS,
      };

      expect(getNeurons()).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsSuccess', () => {
      const fixture = [];
      const expectedResult = {
        type: GET_NEURONS_SUCCESS,
        neurons: fixture,
      };

      expect(getNeuronsSuccess(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: GET_NEURONS_ERROR,
        error: fixture,
      };

      expect(getNeuronsError(fixture)).toEqual(expectedResult);
    });
  });
});
