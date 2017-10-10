import React from 'react';
import Nav from './Nav';
import $ from 'jquery';

class Film extends React.Component {
  constructor(){
    super();
    this.state = {
      mainVideo: ''
    };
  }

  componentWillMount() {
    const publicVimeoToken = '7d559bb6652e6a5df68cab1975e8e724';
    $.ajax({
      method: 'GET',
      url: 'https://api.vimeo.com/users/thebluegene/videos?sort=likes',
      headers: {
        'Authorization': 'Bearer ' + publicVimeoToken
      },
      success: (result) => {
        $('.insert-video').html(result.data[0].embed.html);
      }
    });
  }

  embedVimeoVideo(embeddedVid) {
    return { __html: embeddedVid }
  }

  render() {
    return (
      <div className="row">
        <Nav />
        <div className="small-12 columns insert-video">
        </div>
      </div>
    );
  }
}
export default Film;
