import React from 'react';
import Social from './Social';
import {Link} from 'react-router';

class Nav extends React.Component {

  constructor() {
    super();
    this.state = {
      openNav: 'closed',
      activeLink: null
    }
  }
  //
  // componentWillMount() {
  //   const page = this.props.page.slice(1);
  //   this.setState({active: page});
  // }
  //
  navHandler(activePage) {
    // this.setState({active: activePage})
      this.setState({
        openNav: 'closed'
      });
  }

  handleNavClick() {
    this.setState({
      openNav: this.state.openNav == 'open' ? 'closed' : 'open'
    });
  }

  render() {
    return (
      <div className="navbar">
        <div className="row small-collapse medium-uncollapse">
          <div className="columns">
            <div className={this.state.openNav + " top-nav"}>
              <div className="show-for-small-only">
                <Social />
              </div>
              <span className="top-nav--name" onClick={this.handleNavClick.bind(this)}>
                +
              </span>
              <ul className="top-nav-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className={this.state.activeLink == 'code'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--code" to="/code" onClick={this.navHandler.bind(this, 'code')}>
                    Code
                  </Link>
                </li>
                <li className={this.state.activeLink == 'photo'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--photo" to={{
                    pathname: "/photo",
                    state: {
                      page: 'album-list'
                    }
                  }} onClick={this.navHandler.bind(this, 'photo')}>
                    Photo
                  </Link>
                </li>
                <li className={this.state.activeLink == 'film'
                  ? 'active'
                  : ''}>
                  <Link className="top-nav-item top-nav-item--film" to="/film" onClick={this.navHandler.bind(this, 'film')}>
                    Film
                  </Link>
                </li>
                <li className={this.state.activeLink == 'blog'
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
