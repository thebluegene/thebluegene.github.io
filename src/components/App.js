import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';
import Photo from './Photo';
import Blog from './Blog';
import Code from './Code';
import Social from './Social';
import HomePage from './Home';
import {Link} from 'react-router';
import { Transition } from 'react-transition-group';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    let pageType = this.props.location.pathname.split('/')[1];
    this.state = {
      backgroundClass: pageType ? pageType + '__page' : 'home__page',
      showSocial: props.params.hasOwnProperty('album') ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    let pageType = nextProps.location.pathname.split('/')[1];
    this.setState({
      backgroundClass: pageType ? pageType + '__page' : 'home__page',
      showSocial: nextProps.params.hasOwnProperty('album') ? true : false
    })
  }

  render() {
    return (
      <div className={ this.state.backgroundClass + ' site-container'}>
        {!this.props.children && 
          <div>
            <HomePage />
          </div>
        }
        {this.props.children &&
          <div>
            <Nav page={this.props.location.pathname} />
            <div>
              { this.props.children }
            </div>
            <div className={this.state.showSocial ? 'hide-social':'hide-for-small-only'}>
              <Social />
            </div>
          </div>
        }
      </div>
    );
  }
}

  App.propTypes = { children: React.PropTypes.object };

  export default App;
