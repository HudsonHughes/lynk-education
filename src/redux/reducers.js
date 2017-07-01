/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../containers/Home/reducer';
import userInfo from '../containers/UserInfo/reducer';
import login from '../containers/Login/reducer';

export default combineReducers({
  home,
  userInfo,
  login,
  router,
});
