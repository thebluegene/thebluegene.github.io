import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {

  constructor() {
    super();
    this.state = {
      active: null
    }
  }

  componentWillMount() {
    console.log(this.props.page.slice(1));
    const page = this.props.page.slice(1);
    this.setState({active: page});
  }

  navHandler(activePage) {
    console.log(this.props.location);
    this.setState({active: activePage})
  }

  render() {
    return (
      <div className="navbar">
        <div className="row">
          <div className="columns">
            <div className="top-nav">
              <span className="top-nav--name">
                <Link to="/">Gene Ang</Link>
              </span>
              <ul className="top-nav-list">
                <li className={this.state.active == 'code'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--code" to="/code" onClick={this.navHandler.bind(this, 'code')}>
                    Code
                  </Link>
                </li>
                <li className={this.state.active == 'photo'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--photo" to={{
                    pathname: "/photo",
                    state: {
                      page: 'album-list'
                    }
                  }} onClick={this.navHandler.bind(this, 'photo')}>
                    Visual
                  </Link>
                </li>
                <li className={this.state.active == 'blog'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--blog" to="/blog" onClick={this.navHandler.bind(this, 'blog')}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Nav;
