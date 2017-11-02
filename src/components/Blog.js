import React from 'react';
import { Link } from 'react-router';
import * as contentful from 'contentful';
import Placeholder from './Placeholder';
import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 }
};

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.getBlogPosts();

    this.state = {
      layoutClass: props.page ? 'small-12' : 'medium-8 medium-offset-2',
      blogPosts: [],
      loading: 'loading',
      animateIn: false
    };
  }

  // componentDidMount() {
  //   this.setState({
  //   });
  // }

  getBlogPosts() {
    const react = this;
    const client = contentful.createClient({
      space: 'ukd0j57tgsx1',
      accessToken: '8d5aeb84d6b70df2cccc6e027f6c7197a0f61e851fadf7de8cb865d2d0fa29c1'
    });

    client.getEntries()
      .then(function (contentType) {
        react.setState({
          blogPosts: contentType.items,
          loading: ''
        });
      })
      .then(function () {
        react.setState({
          animateIn: true,
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="page">
        <h1>Blog</h1>
        <div className={"placeholder " + this.state.loading}>
          <Placeholder />
        </div>
        <div className="row">
          <div className={ this.state.layoutClass + " columns" } >
          {this.state.blogPosts.map((data, i) => {
            return (
              <Transition key={i} in={this.state.animateIn} timeout={duration} >
                {(state) => (
                  <div className="blog__container" style={{...defaultStyle, ...transitionStyles[state]}}>
                    <div className="blog__title">
                      { data.fields.blogTitle }
                      <span className="blog__date">
                        { data.fields.date }
                      </span>
                    </div>
                    <div className="blog__body">
                      { data.fields.blogContent }
                    </div>
                  </div>
                )}
              </Transition>
            );
          })}
          </div>
        </div>
      </div>
    );
  };
}

export default Blog;
