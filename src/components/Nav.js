import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className="navbar">
        <div className="row expanded">
          <div className="columns">
            <div className="top-nav">
              <span className="top-nav--name"><Link to="/">Gene Ang</Link></span>
              <ul className="top-nav-list">
                <li><Link to="/code"> Code </Link></li>
                <li><Link to={{ pathname: "/photo", state: {page: 'album-list'}}}> Pictures </Link></li>
                <li><Link to="/blog"> Blog </Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Nav;
