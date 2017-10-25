import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';
import Photo from './Photo';
import Blog from './Blog';
import Code from './Code';
import Social from './Social';
import {Link} from 'react-router';
import $ from 'jquery';
import { Transition } from 'react-transition-group';

const duration = 1000;

const defaultStyle = {
  transition: `background ${duration}ms ease-in-out`,
  // background: 'red',
}

const transitionStyles = {
  // entering: { background: 'red' },
  // entered: { background: 'blue' },
};

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
      fadeIn: false
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     fadeIn: true
  //   });
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.fadeIn == false) {
  //    this.setState({
  //      fadeIn: true
  //    })
  //  }
  // }
  //
  handleClick() {
    // this.setState({
    //   fadeIn: false
    // });
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <Transition in={true} timeout={duration}>
            {(state) => (
            <div className="home-content page" style={{...defaultStyle, ...transitionStyles[state]}}>
              <div className="row expanded">
                <Social />
                <div className="home-content__main">
                  <div className="main-title">
                    <h1>
                      Gene Ang
                    </h1>
                  </div>
                  <div className="sub-title">
                    I'm a <Link onClick={this.handleClick.bind(this)} className="code-link" to="/code">Web Developer</Link> in San Francisco <br />
                  Who takes a lot of <Link onClick={this.handleClick.bind(this)} className="photo-link" to="/photo">Photos</Link> <br />
                and makes a <Link onClick={this.handleClick.bind(this)} className="film-link" to="/film">Video</Link> here and there.
                  </div>
                </div>
              </div>
            </div>
          )}
          </Transition>
        </div>
      );
    } else {
      return (
          <div>
            <Nav page={this.props.location.pathname} />
              <Transition in={this.state.fadeIn} timeout={duration}>
                {(state) => (
                  <div style={{...defaultStyle, ...transitionStyles[state]}}>
                    { this.props.children }
                  </div>
                )}
            </Transition>
            <div className="hide-for-small-only">
              <Social />
            </div>
          </div>
        );
      }
    }
  }

  App.propTypes = { children: React.PropTypes.object };

  export default App;
