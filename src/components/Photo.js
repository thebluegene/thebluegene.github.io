import React from 'react';
import Sidebar from './Sidebar';

class Photo extends React.Component {
  constructor(){
    super();
    this.props = {
      pageTitle: 'Photography'
    }
    this.state = {
      photoArray: []
    };
  }

  componentWillMount() {
    this.loadFlickrPhotos();
  }

  loadFlickrPhotos() {
    const flickrPortfolio =  'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d409981bb930b8152dd1e2822fc80ca5&photoset_id=72157675263315405&user_id=46863234%40N05&format=json&nojsoncallback=1';
    const photoUrls = [];

    $.get(flickrPortfolio, (data) => {
      const photos = data.photoset.photo;
      for (let i = 0; i < photos.length; i++) {
        const farmId = photos[i].farm;
        const serverId = photos[i].server;
        const photoId = photos[i].id;
        const photoSecret = photos[i].secret;
        const url = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + photoId + '_' + photoSecret + '_c.jpg';
        photoUrls.push(url);
      }
    }).done(() => {
      this.setState({
        photoArray: photoUrls
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="small-12 medium-9 columns">
          <div className="row small-up-1">
            {this.state.photoArray.map((data) => {
              return <div className="column align-middle"><div className="image-container"><img src={data}></img></div></div>;
            })}
          </div>
        </div>
        <div className="small-12 medium-3 columns">
          <Sidebar title={"Photos"} />
        </div>
      </div>
    );
  }
}
export default Photo;
