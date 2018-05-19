import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserHeader extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>{user.username} / {user.total}</h2>
        <img src={user.url} alt="" className="user-image" />
        <span style={{ fontSize: '32px', paddingTop: '25px', textAlign: 'center' }}>{user.name}</span>
      </div>
    );
  }
}

export default UserHeader;
