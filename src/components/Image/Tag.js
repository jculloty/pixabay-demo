import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withApi from '../API';

class ImageTag extends PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  }

  queryTag = () => {
    this.props.queryApi(this.props.tag);
    this.props.history.push('/');
  }

  render() {
    return (
      <span className="image-tag" key={this.props.tag} onClick={this.queryTag}>
        {this.props.tag}
      </span>
    );
  }
}

export default withRouter(withApi(ImageTag, ['queryApi']));
