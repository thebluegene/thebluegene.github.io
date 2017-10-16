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
      layoutClass: props.page ? 'small-12' : 'medium-10 medium-offset-1',
      projectArray: [
        {
          'title': '8 Years of Photography',
          'date': 'May 2017',
          'subtitle': 'Data visualization project using EXIF data from all the photos I\'ve posted online',
          'color': '#004777',
          'buttonStyle': {
            transition: '1s all',
            borderBottom: '1px solid #004777'
          },
          'styles': {
            fontFamily: 'Fredericka the Great',
            fontSize: '40px'
          },
          'link': '/flickr-data-proj'
        }, {
          'title': 'Photo Gallery',
          'date': 'September 2017',
          'subtitle': 'React photo gallery using Flickr\'s API',
          'color': '#FF7700',
          'buttonStyle': {
            transition: '1s all',
            borderBottom: '1px solid #FF7700'
          },
          'styles': {
            fontFamily: 'Suranna',
            fontSize: '40px'
          },
          'link': '#/photo'
        }, {
          'title': 'Past Projects',
          'subtitle': '(Coming soon)',
          'date': 'January 2016',
          'color': '#A30000',
          'buttonStyle': {
            transition: '1s all',
            borderBottom: '1px solid #A30000'
          },
          'styles': {
            fontFamily: 'Arial',
            fontSize: '40px'
          },
          'link': '#'
        }
      ]
    }
  }

  changeBg(i) {
    this.state.projectArray[i].buttonStyle = {
      borderBottom: '1px solid ' + this.state.projectArray[i].color,
      backgroundColor: this.state.projectArray[i].color,
      transition: '1s all'
    }
    this.setState({
      projectArray: this.state.projectArray
    });
  }

  revertBg(i) {
    this.state.projectArray[i].buttonStyle = {
      borderBottom: '1px solid ' + this.state.projectArray[i].color,
      transition: '1s all'
    }
    this.setState({
      projectArray: this.state.projectArray
    });
  }

  render() {
    return (
      <div className={this.state.idClass}>
        <div className="row">
          <div className={this.state.layoutClass + " columns"}>
            {this.state.projectArray.map((data, i) => {
              return (
                <div key={i} className="code" style={this.state.idClass ? data.buttonStyle : {}} onMouseLeave={this.revertBg.bind(this, i)} onMouseEnter={this.changeBg.bind(this, i) }>
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
