/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as action from './action';
import type { Home as HomeType, Dispatch, Reducer } from '../../types';

// Export this for unit testing more easily
export class Screen extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }

  props: Props;

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  static defaultProps: {
    
  };

  componentWillMount() {
    this.props.token = null;
    this.props.cookies.set('name', 'Joel', '/');
    this.state = {
      name: this.props.cookies.set('name') || 'Ben',
    };

  }

  componentDidMount() {
    
  }

  handleSubmission(event){
    this.props.loginRequest(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />
        <AppBar
          title="Login"
        />
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange = {(event,newValue) => this.setState({username:newValue})}
          />
        <br/>
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
          <br/>
          <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmission(event)}/>
          <h1>{JSON.stringify(this.props)}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.login.status,
    token: state.login.token
  }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  (dispatch: Dispatch) => ({
    loginRequest: (email: string, password: string) => dispatch(action.loginRequest(email, password)),
  }),
);

export default withCookies(connector(Screen));
