import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';
import Photo from './Photo';
import Blog from './Blog';
import Code from './Code';
import Social from './Social';
import {Link} from 'react-router';
import { Transition } from 'react-transition-group';
import $ from 'jquery';

const duration = 400;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting: {opacity: 0},
  exited: {opacity: 0}
};

const linkStyle = {
  transition: 'all 1s ease-in-out',
  width: 0
}

const transitionLinkStyles = {
  entering: { width: 0 },
  entered: { width: '100%' }
}
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
      animateIn: false
    };
  }

   componentDidMount() {
     this.setState({
       animateIn: true
     });
   }

   componentDidUpdate(prevProps, prevState) {
     if(prevState.animateIn == false) {
       this.setState({
         animateIn: true
       })
     }
   }

   handleClick() {
     this.setState({
       animateIn: false
     });
   }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <div className="home-content page">
            <div className="row expanded">
              <Transition in={this.state.animateIn} timeout={duration * 3} >
                {(state) => (
                  <div style={{...defaultStyle, ...transitionStyles[state]}}>
                    <Social />
                  </div>
                )}
              </Transition>
              <div className="home-content__main">
              <Transition in={this.state.animateIn} timeout={duration} >
                {(state) => (
                <div className="main-title" style={{...defaultStyle, ...transitionStyles[state]}}>
                  <h1>
                    Gene Ang
                  </h1>
                </div>
                )}
              </Transition>
              <Transition in={this.state.animateIn} timeout={duration * 2} >
                {(state) => (
                <div className="sub-title" style={{...defaultStyle, ...transitionStyles[state]}}>
                  I'm a
                  <Link onClick={ this.handleClick.bind(this) } to="/code">
                  <span className="link-text">Web Developer</span>
                  <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg code-link"> </span>
                  </Link>
                   in San Francisco, <br /> who takes a lot of
                   <Link onClick={ this.handleClick.bind(this) } to={{
                  pathname: "/photo",
                  state: {
                    page: "album-list"
                  }}}>
                  <span className="link-text">Photos</span>
                  <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg photo-link"> </span></Link>
                   and makes
                   <Link to="/film">
                   <span className="link-text">Videos</span>
                  <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg film-link"> </span>
                   </Link>
                   here and there. <br />
                  I'll update my
                  <Link onClick={ this.handleClick.bind(this) } to="/blog">
                  <span className="link-text">blog</span>
                  <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg blog-link"> </span>
                  </Link>
                  occasionally.
                </div>
                )}
              </Transition>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
          <div>
            <Nav page={this.props.location.pathname} />
                  <div>
                    { this.props.children }
                  </div>
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
