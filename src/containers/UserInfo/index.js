/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import * as action from './action';
import type { UserInfo as UserInfoType, Dispatch, Reducer } from '../../types';
import UserCard from '../../components/UserCard';

type Props = {
  userInfo: UserInfoType,
  match: Object,
  fetchUserIfNeeded: (id: string) => void,
};

// Export this for unit testing more easily
export class UserInfo extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  props: Props;

  componentWillMount() {
    const { cookies } = this.props;
    cookies.set('name', 'BOB');
    this.state = {
      item: cookies.get('name') || 'Ben',
    };
  }

  static defaultProps: {
    userInfo: {},
    match: { params: { id: '' } },
    fetchUserIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchUserIfNeeded, match: { params } } = this.props;

    fetchUserIfNeeded(params.id);
  }

  renderUserCard = () => {
    const { userInfo, match: { params } } = this.props;
    const userInfoById = userInfo[params.id];
    if (!userInfoById || userInfoById.readyStatus === action.USER_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (userInfoById.readyStatus === action.USER_FAILURE) {
      return <p>Oops, Failed to load info!</p>;
    }

    return <UserCard info={userInfoById.info} />;
  }

  render() {
    return (
      <div>
        <Helmet title="User Info" />
        <h1>Hello {this.state.item}!</h1>
        {this.renderUserCard()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ userInfo }: Reducer) => ({ userInfo }),
  (dispatch: Dispatch) => ({
    fetchUserIfNeeded: (id: string) => dispatch(action.fetchUserIfNeeded(id)),
  }),
);

export default withCookies(connector(UserInfo));
