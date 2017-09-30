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
                  9/24/2017
                </span>
              </div>
              <div className="blog__body">
                Im Gene, and this is my personal showcase of my dev and visual work.
                I like to code for the web, so Ill periodically post projects with
                whatever tech Im trying out. Ill also keep my selected photo works up to date,
                and eventually get a video section up. This website is an ongoing
                project and will act like a sandbox for my design and development ideas.
                <br /><br />
                Currently Im working as a web developer in San Francisco. Feel free
                to contact me at gene.ang92@gmail.com if you have any questions or
                would just like to chat.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Blog;
