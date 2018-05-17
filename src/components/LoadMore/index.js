import React from 'react';

import { withApi } from '../ApiContext';

function LoadMore(props) {
  return (
    <div>
      <button onClick={props.loadMore} className="load-more-button">
        Load more images...
      </button>
    </div>
  );
}

export default withApi(LoadMore, ['loadMore']);
