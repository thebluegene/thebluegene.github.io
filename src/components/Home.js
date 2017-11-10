import React from 'react';
import Social from './Social';
import classnames from 'classnames';
import {Link} from 'react-router';
import { Transition } from 'react-transition-group';

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

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        return(
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
                                    <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg photo-link"> </span>
                                </Link>
                                and dabbles in 
                                <Link to="/film">
                                    <span className="link-text">Filmmaking.</span>
                                    <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg film-link"> </span>
                                </Link>
                                <br />
                                I also try to keep my
                                <Link onClick={ this.handleClick.bind(this) } to="/blog">
                                    <span className="link-text">blog</span>
                                    <span style={{...linkStyle, ...transitionLinkStyles[state]}} className="link-text--bg blog-link"> </span>
                                </Link>
                                updated.
                            </div>
                            )}
                        </Transition>
                    </div>
                </div>
            </div>
        );
    }
}
export default HomePage;