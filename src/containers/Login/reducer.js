/* @flow */

import _ from 'lodash';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUESTING,
  LOGIN_WAITING,
} from './action';
import type { Action } from '../../types';

const initialState = {
  status: LOGIN_WAITING,
  token: null,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return _.assign({}, state, { status: LOGIN_REQUESTING });
    case LOGIN_FAILURE:
      return _.assign({}, state, {
        status: LOGIN_FAILURE,
        err: action.err,
      });
    case LOGIN_SUCCESS:
      return _.assign({}, state, {
        status: LOGIN_SUCCESS
      });
    default:
      return state;
  }
};
