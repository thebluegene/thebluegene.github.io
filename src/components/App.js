import React from 'react';
import Header from './Header';
import classnames from 'classnames';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      categories: [
        //{name:'Develop', class:'code-link home-nav-link', link:'/code', image:''},
        {name:'Photograph', class:'photo-link home-nav-link', link:'/photo', image:'src/images/photo-home.jpg'},
        {name:'Film', class:'film-link home-nav-link', link:'/link', image:'src/images/after-all-gif.gif'}
      ]
    };
  }

  componentDidMount() {
    var pathname = this.props.location.pathname.replace('/','');
    if(pathname){
      for(let i=0; i < this.state.categories.length; i++){
        if(this.state.categories[i].class.includes(pathname)){
          this.state.categories[i].class += " extra";
          this.setState({
            categories: this.state.categories
          });
        }
      }
    }
  }

  activateLink(index ,e) {
    for(let i=0; i < this.state.categories.length; i++){
      this.state.categories[i].class = this.state.categories[i].class.replace(/extra/g, "").trim();
    }
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
                <div className="row small-up-1 medium-up-3">
                  <div className="column">
                    <div className="home-develop-box">
                    </div>
                    <Link to='/code' className='code-link home-nav-link' onClick={this.activateLink.bind(this)}>Develop</Link>
                  </div>
                  {this.state.categories.map((data, i) =>  {
                    return(
                      <div className="column">
                        <img src={data.image}></img>
                        <Link key={i} to={data.link} className={data.class} onClick={this.activateLink.bind(this, i)}>{data.name}</Link>
                      </div>
                    );
                  })}
                </div>
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
