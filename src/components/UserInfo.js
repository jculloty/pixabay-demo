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
      <div onClick={this.queryUser}>
        <img src={user.url} alt="" className="user-image" />
        <span style={{ fontSize: '32px', paddingTop: '25px', textAlign: 'center' }}>{user.name}</span>
      </div>
    );
  }
}

export default withRouter(withApi(UserInfo, ['queryApi']));
