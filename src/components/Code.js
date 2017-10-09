import React from 'react';
import {Link} from 'react-router';

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      // projectArray: [
      //   { 'title' : '7 Years of Photography' , 'styles' : {fontFamily:'Marcellus SC', fontSize:'28px'} },
      //   { 'title' : 'This Website' , 'styles' : {fontFamily:'Fredericka the Great', fontSize:'28px'} }
      // ]
      projectArray: [
        {
          'title': '8 Years of Photography',
          'date': 'May 2017',
          'styles': {
            fontFamily: 'Fredericka the Great',
            fontSize: '40px'
          }
        }, {
          'title': 'Photo Gallery',
          'date': 'September 2017',
          'styles': {
            fontFamily: 'Suranna',
            fontSize: '40px'
          }
        }, {
          'title': 'Past Projects',
          'date': 'January 2016',
          'styles': {
            fontFamily: 'Arial',
            fontSize: '40px'
          }
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="small-12 columns">
            {this.state.projectArray.map((data, i) => {
              return (
                <div key={i} className="code">
                  <a href="/test.html">
                    <div className="code__title" style={data.styles}>
                      {data.title}
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
