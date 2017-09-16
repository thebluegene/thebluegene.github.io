import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Blog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      layoutClass: props.page ? 'small-12' : 'medium-8 medium-offset-2'
    }
  }

  render() {
    return (
      <div className="blog">
        <div className="row">
          <div className={ this.state.layoutClass + " columns" } >
            <div className="blog__container">
              <div className="blog__title">
                Hey, welcome
                <span className="blog__date">
                  8/5/2017
                </span>
              </div>
              <div className="blog__body">
                This website is my personal showcase for my dev and visual work. I
                currently work as a web developer in San Francisco and shoot things with a
                camera on the side.
                <br /><br />
                Feel free to contact me at gene.ang92@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Blog;
