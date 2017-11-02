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
    
    this.state = {
      backgroundClass: this.props.location.pathname.split('/')[1] + '__page'
    }
  }

  componentWillReceiveProps(nextProps) {
    var pageType = nextProps.location.pathname.split('/')[1];
    this.setState({
      backgroundClass: pageType ? pageType + '__page' : 'home__page'
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
            <div className="hide-for-small-only">
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
