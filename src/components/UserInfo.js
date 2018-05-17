import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withApi from './ApiContext';

class UserInfo extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  queryUser = () => {
    this.props.queryApi(`user:${this.props.user.name}`);
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;

    return (
      <span onClick={this.queryUser}>
        <img src={user.url} alt="" />
        <span>{user.name}</span>
      </span>
    );
  }
}

export default withRouter(withApi(UserInfo, ['queryApi']));
