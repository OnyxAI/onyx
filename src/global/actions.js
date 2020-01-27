/* eslint-disable no-plusplus */
/**
 *
 * Global Actions
 *
 */
import { ADD_TOAST, REMOVE_TOAST } from './constants';

let id = 0;

const defaultOptions = {
  color: '#1e88e5',
  duration: 5000,
};

export function createToast(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++,
  };
}

export function addToast(options = {}) {
  return {
    payload: createToast(options),
    type: ADD_TOAST,
  };
}

export function removeToast(_id) {
  return {
    payload: _id,
    type: REMOVE_TOAST,
  };
}

export default {
  success: options => addToast({ color: '#43a047', ...options }),
  info: options => addToast({ color: '#1e88e5', ...options }),
  error: options => addToast({ color: '#e53935', ...options }),
};
