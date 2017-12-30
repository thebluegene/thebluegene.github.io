import React from 'react';
import Nav from './Nav';
import Placeholder from './Placeholder';
import $ from 'jquery';
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

class Film extends React.Component {
  constructor(){
    super();
    this.state = {
      mainVideo: '',
      chosenVideos: [],
      activeIndex: 0,
      loading: 'loading',
      animateIn: false
    };
  }

  componentDidMount() {
    const react = this;
    const publicVimeoToken = '2cdf01eba4de6c5d983064404b2ca260';
    let chosenVideoArr = [];
    let mainVideo, mainDescription, mainTitle, embedUrl;
    $.ajax()
    .then(function(){
      return $.ajax({
        method: 'GET',
        url: 'https://api.vimeo.com/users/thebluegene/videos?direction=desc',
        headers: {
          'Authorization': 'Bearer ' + publicVimeoToken
        },
        success: (result) => {
          mainVideo = result.data[3].embed.html;
          embedUrl = 'https://player.vimeo.com/video/'+result.data[3].uri.split('/')[2]+'?transparent=1&title=false&byline=false&portrait=false';
          mainDescription = result.data[3].description;
          mainTitle = result.data[3].name;
          chosenVideoArr = [result.data[3], result.data[1], result.data[0]];
        }
      })
    })
    .then(function() {
      return $.ajax({
        method: 'GET',
        url: 'https://api.vimeo.com/users/thebluegene/appearances?direction=desc',
        headers: {
          'Authorization': 'Bearer ' + publicVimeoToken
        },
        success: (result) => {
          chosenVideoArr.push(result.data[2]);
          react.setState({
            mainVideo: mainVideo,
            mainDescription: mainDescription,
            mainTitle: mainTitle,
            embedUrl: embedUrl,
            chosenVideos: chosenVideoArr,
            loading: '',
            animateIn: true
          });
        }
      });
    })
  }

  handleVideoClick(index, data) {
      let embedUrl = 'https://player.vimeo.com/video/'+data.uri.split('/')[2]+'?transparent=1&title=false&byline=false&portrait=false';
      this.setState({
        mainVideo: data.embed.html,
        mainDescription: data.description,
        embedUrl: embedUrl,
        mainTitle: data.name,
        activeIndex: index
      })
  }

  handleImageLoad = (e, i) => {
    var target = e.target;
    setTimeout(function() {
      target.setAttribute("class", "show");
    }, 400);
  }

  render() {
    return (
      <div className="page">
        <h1>FILM</h1>
        <div className="row">
          <div className="medium-10 medium-offset-1 columns">
            <div className={"placeholder " + this.state.loading}>
              <Placeholder/>
            </div>
            {/* <div className="film__main-video" dangerouslySetInnerHTML={{ __html: this.state.mainVideo }} /> */}
            <Transition in={this.state.animateIn} timeout={duration} >
              {(state) => (
              <div style={{...defaultStyle, ...transitionStyles[state]}}>
                <div className="film__main-video">
                  <iframe src={this.state.embedUrl} height="800" width="1920" allowFullScreen></iframe>
                </div>
                <div className="film__main-description">
                  <span className="film__main-title">
                    { this.state.mainTitle }
                  </span>
                  { this.state.mainDescription }
                </div>
              </div>
              )}
            </Transition>
            <div className="film__video-gallery">
              <div className="row small-up-3">
                {this.state.chosenVideos.map((data, i) => {
                  return (
                  <div key={i} className={i == this.state.activeIndex ? "not-active columns" : "columns"}>
                    <div className="film__video-thumbnail-container">
                      <img onLoad={(e) => this.handleImageLoad(e, i)} src={ data.pictures.sizes[3].link } onClick={this.handleVideoClick.bind(this, i, data)} />
                      <div className="film__video-thumbnail-title">
                        { data.name }
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
          </div>
        </div>
        </div>
    </div>
    );
  }
}
export default Film;
