/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import * as action from './action';
import type { Home as HomeType, Dispatch, Reducer } from '../../types';

type Props = {
  home: HomeType,
  fetchUsersIfNeeded: () => void,
};

// Export this for unit testing more easily
export class Screen extends PureComponent {
  props: Props;

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  static defaultProps: {
    home: {
      readyStatus: 'USERS_INVALID',
      list: null,
    },
    fetchUsersIfNeeded: () => {},
  };

  componentWillMount() {
    const { cookies } = this.props;
    cookies.set('name', 'Joel', '/');
    this.state = {
      name: cookies.get('name') || 'Ben',
    };
  }

  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  render() {
    var i = {};
    return (
      <div>
        <Helmet title="Template" />
        <h1>Hello {this.state.name}!</h1>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ home }: Reducer) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded()),
  }),
);

export default withCookies(connector(Screen));
