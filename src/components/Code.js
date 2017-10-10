import React from 'react';
import {Link} from 'react-router';

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // projectArray: [
      //   { 'title' : '7 Years of Photography' , 'styles' : {fontFamily:'Marcellus SC', fontSize:'28px'} },
      //   { 'title' : 'This Website' , 'styles' : {fontFamily:'Fredericka the Great', fontSize:'28px'} }
      // ]
      idClass: props.page ? '' : 'code__page',
      layoutClass: props.page ? 'small-12' : 'medium-8 medium-offset-2',
      projectArray: [
        {
          'title': '8 Years of Photography',
          'date': 'May 2017',
          'styles': {
            fontFamily: 'Fredericka the Great',
            fontSize: '40px'
          },
          'link': ''
        }, {
          'title': 'Photo Gallery',
          'date': 'September 2017',
          'styles': {
            fontFamily: 'Suranna',
            fontSize: '40px'
          },
          'link': '/photo'
        }, {
          'title': 'Past Projects',
          'date': 'January 2016',
          'styles': {
            fontFamily: 'Arial',
            fontSize: '40px'
          },
          'link': ''
        }
      ]
    }
  }

  render() {
    return (
      <div className={this.state.idClass}>
        <div className="row">
          <div className={this.state.layoutClass + " columns"}>
            {this.state.projectArray.map((data, i) => {
              return (
                <div key={i} className="code">
                  <Link to={data.link}>
                    <div className="code__title" style={data.styles}>
                      {data.title}
                    </div>
                    <div className="code__date">
                      {data.date}
                    </div>
                  </Link>
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
