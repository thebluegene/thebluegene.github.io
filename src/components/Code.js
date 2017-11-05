import React from 'react';
import {Link} from 'react-router';
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

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateIn: false,
      layoutClass: props.page ? 'small-12' : 'medium-8 medium-offset-2',
      projectArray: [
        {
          'title': '8 Years of Photography',
          'date': 'October 2017',
          'subtitle': 'Data visualization project using EXIF data from all the photos I\'ve posted online. I collected data via the Flickr API and used D3 for the visualizations.',
          'color': '#004777',
          'styles': {
            fontFamily: 'Fredericka the Great',
            fontSize: '40px'
          },
          'link': '/flickr-data-proj'
        },
        {
          'title': 'Photo Gallery',
          'date': 'October 2017',
          'subtitle': 'As a part of building this website, I created a photo gallery from scratch that pulls selected Flickr albums (based on album name) through their API.',
          'color': '#FF7700',
          'styles': {
            fontFamily: 'Suranna',
            fontSize: '40px'
          },
          'link': '#/photo'
        }, 
        {
          'title': 'Vonnda',
          'subtitle': 'Vonnda is a web development agency specializing in e-commerce solutions where I currently work as a developer. If you have any questions about our work, feel free to contact me.',
          'date': 'February 2016 - Present',
          'color': '#A30000',
          'styles': {
            fontFamily: 'Quicksand',
            fontSize: '40px',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          },
          'link': 'https://vonnda.com/'
        },
      ]
    }
  }
  componentDidMount() {
      this.setState({
        animateIn: true
      });
  }

  render() {
    return (
      <div className="page">
        <h1>DEVELOP</h1>
        <div className="row">
          <div className={this.state.layoutClass + " columns"}>
            {this.state.projectArray.map((data, i) => {
              return (
                <Transition key={i} in={this.state.animateIn} timeout={duration * i} >
                  {(state) => (
                  <div className="code" style={{...defaultStyle, ...transitionStyles[state]}}>
                    <a target="_blank" href={data.link}>
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
                  )}
                </Transition>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Code;
