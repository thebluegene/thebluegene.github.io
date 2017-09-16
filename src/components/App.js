import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';
import Photo from './Photo';
import Blog from './Blog';
import Code from './Code';
import { Link } from 'react-router';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { name: 'Code', class: 'code-link', link: '/code', image: '' },
        { name: 'Photograph', class: 'photo-link', link: '/photo', image: '' },
        { name: 'Blog', class: 'writing-link', link: '/blog', image: '' }
      ],
      background: 'default-bg',
      currentImage: ''
    };
  }

  componentWillMount() {
    let pathname = this.props.location.pathname.replace('/', '');
    if (pathname) {
      for (let i = 0; i < this.state.categories.length; i++) {
        if (this.state.categories[i].class.includes(pathname)) {
          this.setState({
            categories: this.state.categories,
            background: this.state.categories[i].class
          }, function () {
            $('body').removeClass(this.state.background).addClass(this.state.background);
          });
        }
      }
    } else {
      this.setState({
        background: 'default-bg'
      }, function () {
        $('body').addClass(this.state.background);
      });
    }
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <div>
            <div>
              <div className="home-content">
                <div className="row expanded">
                  <div className="social-media">
                    <ul className="social-media__list">
                      <li className="social-media__list-item"><i className="fa fa-flickr" aria-hidden="true"></i></li>
                      <li className="social-media__list-item"><i className="fa fa-vimeo" aria-hidden="true"></i></li>
                      <li className="social-media__list-item"><i className="fa fa-linkedin-square" aria-hidden="true"></i></li>
                    </ul>
                  </div>
                  <div className="main-title">
                    <h1>
                        <Link to="/">
                          Gene Ang
                        </Link>
                        <span className="sub-title"> Web developer & Photographer</span>
                    </h1>
                  </div>
                </div>
                <div className="home-content__sections">
                  <div className="row expanded-constraint">
                  {this.state.categories.map((data, i) => {
                    return (
                      <div key={i} className="small-12 medium-4 columns text-center">
                        <Link key={i} to={ data.link } className={ data.class + ' home-nav-link' }>
                         { data.name }
                         <i className="fa fa-angle-right"></i>
                        </Link>
                        { data.link === "/blog" &&
                          <Blog page="home" />
                        }
                        { data.link === "/photo" &&
                          <Photo layout="small-up-1" page="home" />
                        }
                        { data.link === "/code" &&
                          <Code page="home" />
                        }
                      </div>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          { this.props.children }
        </div>
      );
    }
  }
}

App.propTypes = { children: React.PropTypes.object };

export default App;
