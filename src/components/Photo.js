import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import Placeholder from './Placeholder';

class Photo extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.previousLocation = this.props.location;
    if (props.params !== undefined && props.params.hasOwnProperty('album')) {
      this.state = {
        photoArray: [],
        currentTitle: '',
        layoutClass: 'small-up-1',
        page: 'album-individual',
        activeAlbum: props.params.album,
        loading: 'loading',
        activePhoto: 0,
        lightbox: false
      };
    } else {
      this.state = {
        photoArray: [],
        currentTitle: '',
        layoutClass: props.layout ? props.layout:'small-up-1 medium-up-3',
        page: props.page ? props.page:'album-list',
        activeAlbum: 0,
        loading: 'loading',
        activePhoto: 0,
        lightbox: false
      };
    }
  }

  componentWillMount() {
    this.loadFlickAlbums();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname === "/photo") {
      this.setState({
        layoutClass: 'small-up-3',
        page: 'album-list',
        activeAlbum: 0,
        loading: 'loading'
      });
      this.loadFlickAlbums();
    }
    console.log(nextProps);
    var images = document.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++) {
      console.log('hello');
      document.getElementsByTagName('img')[i].setAttribute('class','none');
    }
  }

  createUrl(farmId, serverId, photoId, photoSecret) {
    return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + photoId + '_' + photoSecret + '_b.jpg';
  }

  loadFlickAlbums() {
    const galleryUrls = [];
    const flickAlbums = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=d409981bb930b8152dd1e2822fc80ca5&user_id=46863234@N05&format=json&nojsoncallback=1';
    $.get(flickAlbums, (data) => {
      const galleries = data.photosets.photoset;
      for (let i = 0; i < galleries.length; i++) {
        if (galleries[i].title._content.indexOf('(website)') > -1) {
          let id = galleries[i].id;
          const flickrGroup = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d409981bb930b8152dd1e2822fc80ca5&photoset_id=' + id + '&user_id=46863234%40N05&format=json&nojsoncallback=1';
          galleryUrls.push(flickrGroup);
        }
      }
    }).done(() => {
      this.getAlbumThumbnails(galleryUrls);
    });
  }

  getAlbumThumbnails(flickrGroup) {
    let photoUrls = [];
    const deferred = [];
    const react = this;
    for (let group of flickrGroup) {
      deferred.push( $.get(group, (data) => {
        const albumPhoto = data.photoset.photo;
        for (let i = 0; i < albumPhoto.length; i++) {
          let url = this.createUrl(albumPhoto[i].farm, albumPhoto[i].server, albumPhoto[i].id, albumPhoto[i].secret);
          if (albumPhoto[i].isprimary === '1') {
            photoUrls.push({'url': url, 'title': data.photoset.title, 'photos': data.photoset.photo});
          }
        }
      }));
    }
    $.when.apply($, deferred).done( function () {
      photoUrls.sort( function (a, b) {
        return a.title.charAt(0) - b.title.charAt(0);
      });

      if (react.state.page == 'home') {
        photoUrls = photoUrls.slice(0,3);
      }

      if(react.state.activeAlbum) {
        react.handlePhotoClick(react.state.activeAlbum, photoUrls, 'album-list');
      } else {
        react.setState({
          photoArray: photoUrls,
          loading: ' '
        });
      }
    });
  }

  handlePhotoClick(index, photoUrls, prevPageState) {
    if(prevPageState == 'album-list') {
      let albumPhotos = [];
      let url;
      let album = photoUrls[index].photos;

      if(album) {
        for (let i = 0; i < album.length; i++) {
          url = this.createUrl(album[i].farm, album[i].server, album[i].id, album[i].secret);
          albumPhotos.push({ 'url': url });
        }
        this.setState({
          photoArray: albumPhotos,
          currentTitle: '',
          layoutClass: 'small-up-1',
          page: 'album-individual',
          activePhoto: 0,
          loading: ' '
        });
      }
    }

    if(prevPageState == 'album-individual') {
      this.setState({
        activePhoto: index + 1 < this.state.photoArray.length ? index + 1 : 0
      });
    }
  }

  lightSwitch() {
    if (this.state.lightbox == false) {
      document.body.classList.add('lightbox');
      this.setState({
        lightbox: true
      });
    } else {
      document.body.classList.remove('lightbox');
      this.setState({
        lightbox: false
      });
    }
  }

  handleImageLoad = (e, i) => {
    var target = e.target;
      console.log(target);
    setTimeout(function() {
      target.setAttribute("class", "show");
    }, 50);
  }

  render() {
    return (
      <div>
        <div className={"photo-container " + this.state.page}>
          <div className="row">
            <div className="small-12 column">
              <div className={"row " + this.state.layoutClass + " " + this.state.page + "__container"}>
                {this.state.photoArray.map((data, i) => {
                  return (
                    <div key={i} className={ "column align-middle " + (this.state.activePhoto !== i ? 'photo-hide':'') }
                      onClick={ this.handlePhotoClick.bind(this, i, this.state.photoArray, this.state.page) }>
                        <div className={"image-container " + this.state.activeAlbum} >
                          <div className="album-title-overlay">
                            { data.title &&
                               data.title.split(' ').slice(1, data.title.split(' ').length-1).join(" ")
                            }
                          </div>
                          <Link to={{ pathname: "/photo/" + i, state: {page: 'album-individual'}}}>
                              <img onLoad={ (e) => this.handleImageLoad(e, i) } src= { data.url } >
                              </img>
                          </Link>
                        </div>
                    </div>
                  );
                })}
              </div>
              { this.state.page == 'album-individual' &&
              <span className="lightswitch" onClick={ this.lightSwitch.bind(this) }>
                { this.state.lightbox ? 'lights on' : 'lights off' }
              </span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Photo;
