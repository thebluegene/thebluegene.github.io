import React from 'react';
import {Link} from 'react-router';

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idClass: props.page ? '' : 'code__page',
      layoutClass: props.page ? 'small-12' : 'medium-10 medium-offset-1',
      projectArray: [
        {
          'title': '8 Years of Photography',
          'date': 'May 2017',
          'subtitle': 'Data visualization project using EXIF data from all the photos I\'ve posted online',
          'color': '#004777',
          'styles': {
            fontFamily: 'Fredericka the Great',
            fontSize: '45px'
          },
          'link': '/flickr-data-proj'
        }, {
          'title': 'Photo Gallery',
          'date': 'September 2017',
          'subtitle': 'React photo gallery using Flickr\'s API',
          'color': '#FF7700',
          'styles': {
            fontFamily: 'Suranna',
            fontSize: '45px'
          },
          'link': '#/photo'
        }, {
          'title': 'Past Projects',
          'subtitle': '(Coming soon)',
          'date': 'January 2016',
          'color': '#A30000',
          'styles': {
            fontFamily: 'Arial',
            fontSize: '45px'
          },
          'link': '#'
        }
      ]
    }
  }

  render() {
    return (
      <div className={this.state.idClass}>
        <h1>DEVELOP</h1>
        <div className="row">
          <div className={this.state.layoutClass + " columns"}>
            {this.state.projectArray.map((data, i) => {
              return (
                <div key={i} className="code">
                  <a href={data.link}>
                    <div className="code__title" style={data.styles}>
                      {data.title}
                    </div>
                    <div className="code__subtitle">
                      {data.subtitle}
                    </div>
                    <div className="code__date">
                      {data.date}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Code;
