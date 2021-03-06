/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_WAITING = 'LOGIN_WAITING';

export const API_URL = 'https://jsonplaceholder.typicode.com';

// Export this for unit testing more easily
export const fetchLoginRequest = (email: String, password: Stirng, axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUESTING });
    const body = {email: email, password: password};
    const request = {
      url: '/users',
      baseURL: API_URL,
      method: 'get',
      data: body,
      timeout: 2000,
      responseType: 'json',
    }
    return axios.request(request)
      .then((res) => {
        if(res.status == 200){
          dispatch({ type: LOGIN_SUCCESS, data: res.data });
        }else{
          dispatch({ type: LOGIN_FAILURE, data: res.data });
        }
        
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, err });
      });
  };

/* istanbul ignore next */
export const loginRequest = (email: String, password: Stirng): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    return dispatch(fetchLoginRequest(email, password, axios));
  };
