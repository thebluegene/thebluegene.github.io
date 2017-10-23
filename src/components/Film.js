import React from 'react';
import Nav from './Nav';
import Placeholder from './Placeholder';
import $ from 'jquery';

class Film extends React.Component {
  constructor(){
    super();
    this.state = {
      mainVideo: '',
      chosenVideos: [],
      activeIndex: 0,
      loading: 'loading'
    };
  }

  componentDidMount() {
    const react = this;
    const publicVimeoToken = '164d0f03a106e2cdee40a96e0cae6497';
    let chosenVideoArr = [];
    let mainVideo;
    $.ajax()
    .then(function(){
      return $.ajax({
        method: 'GET',
        url: 'https://api.vimeo.com/users/thebluegene/videos',
        headers: {
          'Authorization': 'Bearer ' + publicVimeoToken
        },
        success: (result) => {
          mainVideo = result.data[4].embed.html;
          chosenVideoArr = [result.data[4], result.data[1], result.data[2]]
        }
      })
    })
    .then(function() {
      return $.ajax({
        method: 'GET',
        url: 'https://api.vimeo.com/users/thebluegene/appearances',
        headers: {
          'Authorization': 'Bearer ' + publicVimeoToken
        },
        success: (result) => {
          chosenVideoArr.push(result.data[0]);
          react.setState({
            mainVideo: mainVideo,
            chosenVideos: chosenVideoArr,
            loading: ''
          });
          console.log(react.state);
        }
      });
    })
  }

  handleVideoClick(index, data) {
      this.setState({
        mainVideo: data.embed.html,
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
      <div className="page video__page">
        <h1>FILM</h1>
        <div className="row">
          <div className="small-10 small-offset-1 columns">
            <div className={"placeholder " + this.state.loading}>
              <Placeholder/>
            </div>
            <div className="video__main-video" dangerouslySetInnerHTML={{ __html: this.state.mainVideo }} />
            <div className="video__video-gallery">
              <div className="row small-up-3">
                {this.state.chosenVideos.map((data, i) => {
                  return (
                  <div className={i == this.state.activeIndex ? "not-active columns" : "columns"}>
                    <div key={i}>
                      <img onLoad={(e) => this.handleImageLoad(e, i)} src={ data.pictures.sizes[3].link } onClick={this.handleVideoClick.bind(this, i, data)} />
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
