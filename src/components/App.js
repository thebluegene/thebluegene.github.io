import React from 'react';
import Header from './Header';
import classnames from 'classnames';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      categories: [
        {name:'Develop', class:'code-link home-nav-link', link:'/code'},
        {name:'Photograph', class:'photo-link home-nav-link' ,link:'/photo'},
        {name:'Film', class:'film-link home-nav-link' ,link:'/link'}
      ]
    };
  }

  activateLink(index ,e) {
    this.state.categories[index].class += " extra";
    this.setState({
      categories: this.state.categories
    });
  }

  render() {

    return(
      <div>
          <div className="row home-hero">
            <div className="small-12 columns">
              <div className="home-content">
                <h1 className="main-title"><Link to="/">Gene Ang</Link></h1>
                <p className="about">
                  Hi, Im a front-end developer in San Francisco, working for Vonnda.
                  <br />
                  <br />
                  Check out what I do:
                </p>
                {this.state.categories.map((data, i) =>  {
                  return <Link key={i} to={data.link} className={data.class} onClick={this.activateLink.bind(this, i)}>{data.name}</Link>;
                })}
              </div>
            </div>
          </div>
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = { children: React.PropTypes.object };

export default App;
