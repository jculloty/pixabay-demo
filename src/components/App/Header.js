import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';
import SearchBox from '../Search';

const Header = function() {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2">
            <Link to="/">
              <img src={logo} className="img-fluid" alt="Pixabay logo" />
            </Link>
          </div>
          <div className="col-xl-10">
            <SearchBox />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
