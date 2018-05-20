import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withApi from '../API';
import UserHeader from './UserHeader';
import Grid from '../Grid';

class UserPage extends PureComponent {
  state = {
    user: undefined,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const [, userId, username] = id.match(/^(\d+)-(.+)$/);
    this.props.queryUserDetails(userId, username).then((user) => {
      this.setState({ user }, () => {
        this.props.queryApi(`user:${user.name}`);
      });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <div className="image-view">
          { user && <UserHeader user={user} /> }
        </div>
        <Grid />
      </div>
    );
  }
}

export default withRouter(withApi(UserPage, ['queryUserDetails', 'queryApi']));
