/* @flow */

import type { Dispatch } from './types';
import { fetchUsersIfNeeded } from './containers/Home/action';
import { fetchUserIfNeeded } from './containers/UserInfo/action';
import HomePage from './containers/Home';
import UserInfoPage from './containers/UserInfo';
import NotFoundPage from './containers/NotFound';
import Login from './containers/Login';
import Template from './containers/Template';

export default [
  {
    path: '/',
    exact: true,
    component: Login,  // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      
    ]),
  },
  {
    path: '/template',
    exact: true,
    component: Template,  // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchUsersIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
    {
    path: '/login',
    exact: true,
    component: Login,  // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchUsersIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchUserIfNeeded(params.id)),
    ]),
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
