import React from 'react';
import { Link } from 'react-router';
import * as contentful from 'contentful';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.getBlogPosts();

    this.state = {
      layoutClass: props.page ? 'small-12' : 'medium-8 medium-offset-2',
      blogPosts: []
    };
  }

  getBlogPosts() {
    const react = this;
    const client = contentful.createClient({
      space: 'ukd0j57tgsx1',
      accessToken: '8d5aeb84d6b70df2cccc6e027f6c7197a0f61e851fadf7de8cb865d2d0fa29c1'
    });

    client.getEntries()
      .then(function (contentType) {
        react.setState({
          blogPosts: contentType.items
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="blog">
        <div className="row">
          <div className={ this.state.layoutClass + " columns" } >
          {this.state.blogPosts.map((data, i) => {
            return (
              <div key={i} className="blog__container">
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
            );
          })}
          </div>
        </div>
      </div>
    );
  };
}

export default Blog;
