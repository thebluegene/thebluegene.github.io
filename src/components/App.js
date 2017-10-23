import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';
import Photo from './Photo';
import Blog from './Blog';
import Code from './Code';
import Social from './Social';
import {Link} from 'react-router';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: 'Code',
          class: 'code-link',
          link: '/code',
          image: ''
        }, {
          name: 'Visual',
          class: 'photo-link',
          link: '/photo',
          image: ''
        }, {
          name: 'Blog',
          class: 'writing-link',
          link: '/blog',
          image: ''
        }
      ],
      background: 'default-bg',
      currentImage: ''
    };
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <div>
            <div>
              <div className="home-content">
                <div className="row expanded">
                  <Social />
                  <div className="home-content__main">
                    <div className="main-title">
                      <h1>
                        Gene Ang
                      </h1>
                    </div>
                    <div className="sub-title">
                      I'm a <Link className="code-link" to="/code">Web Developer</Link> in San Francisco <br />
                    Who takes a lot of <Link className="photo-link" to="/photo">Photos</Link> , <br />
                  and sometimes makes <Link className="film-link" to="/film">Movies</Link>
                    </div>
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
            <Nav page={this.props.location.pathname} />
            { this.props.children }
            <Social />
          </div>
        );
      }
    }
  }

  App.propTypes = { children: React.PropTypes.object };

  export default App;
