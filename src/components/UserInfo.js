import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
      <Link to={`/user/${this.props.user.id}-${this.props.user.name}`}>
        <img src={user.url} alt="" className="user-image" />
        <span style={{ fontSize: '32px', paddingTop: '25px', textAlign: 'center' }}>{user.name}</span>
      </Link>
    );
  }
}

export default withRouter(withApi(UserInfo, ['queryApi']));
