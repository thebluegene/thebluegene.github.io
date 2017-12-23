import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import LazyLoad from 'react-lazyload';
import Placeholder from './Placeholder';

class Photo extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.previousLocation = this.props.location;
    this.animationTime = 500; //Adjust the CSS animation time for img tags
    this.loadFlickAlbums();

    if (props.params !== undefined && props.params.hasOwnProperty('album')) {
      this.state = {
        photoArray: [],
        currentTitle: '',
        layoutClass: 'small-up-1',
        page: 'album-individual',
        activeAlbum: props.params.album,
        loading: 'loading',
        activePhoto: props.params.item
          ? props.params.item
          : 0,
        lightbox: false,
        showSwitch: ''
      };
    } else {
      this.state = {
        photoArray: [],
        currentTitle: '',
        layoutClass: props.layout
          ? props.layout
          : 'small-up-1 medium-up-2 large-up-3',
        page: props.page
          ? props.page
          : 'album-list',
        activeAlbum: 0,
        loading: 'loading',
        activePhoto: 0,
        lightbox: false,
        showSwitch: ''
      };
    }
  }


  componentWillUnmount() {
    document.body.classList.remove('lightbox');
  }

  componentWillReceiveProps(nextProps) {
    let react = this;
    if (nextProps.location.state.page == "album-list") {
      this.hideImagesBeforeLoad();
      setTimeout(function() {
        react.setState({
          photoArray: [],
          layoutClass: 'small-up-1 medium-up-2 large-up-3',
          page: 'album-list',
          activeAlbum: 0,
          activePhoto: 0,
          loading: 'loading',
          lightbox: false
        });
        document.body.classList.remove('lightbox');
        react.loadFlickAlbums();
      }, this.animationTime);
    } else if (nextProps.location.state.page == "album-individual") {
      react.setState({activeAlbum: nextProps.params.album});
    }
  }

  hideImagesBeforeLoad() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove('show');
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
      deferred.push($.get(group, (data) => {
        const albumPhoto = data.photoset.photo;
        for (let i = 0; i < albumPhoto.length; i++) {
          let url = this.createUrl(albumPhoto[i].farm, albumPhoto[i].server, albumPhoto[i].id, albumPhoto[i].secret);
          if (albumPhoto[i].isprimary === '1') {
            photoUrls.push({
              'url': url, 
              'title': data.photoset.title,
              'photos': data.photoset.photo, 
              'loaded': ' '
            });
          }
        }
      }));
    }
    $.when.apply($, deferred).done(function() {
      photoUrls.sort(function(a, b) {
        return a.title.charAt(0) - b.title.charAt(0);
      });

      if (react.state.page == 'home') {
        photoUrls = photoUrls.slice(0, 3);
      }

      if (react.state.activeAlbum) {
        react.handlePhotoClick(react.state.activeAlbum, photoUrls, 'album-list');
      } else {
        react.setState({photoArray: photoUrls, loading: ' '});
      }
    });
  }

  handlePhotoClick(index, photoUrls, prevPageState, e) {
    let react = this;
    if (prevPageState == 'album-list') {
      let albumPhotos = [];
      let url;
      let album = photoUrls[index].photos;

      if (album) {
        this.hideImagesBeforeLoad();

        for (let i = 0; i < album.length; i++) {
          url = this.createUrl(album[i].farm, album[i].server, album[i].id, album[i].secret);
          albumPhotos.push({'url': url});
        }
        setTimeout(function() {
          react.setState({
            photoArray: albumPhotos, 
            currentTitle: '', 
            layoutClass: 'small-up-1', 
            page: 'album-individual', loading: ' ',
            showSwitch: ''});
        }, this.animationTime);
      }
    }

    if (prevPageState == 'album-individual') {
      let newIndex;
      console.log(e.nativeEvent.offsetX);
      console.log(e.target.offsetWidth/2);
      if (e.nativeEvent.offsetX < (e.target.offsetWidth) / 2) {
        newIndex = index - 1 < 0
          ? this.state.photoArray.length - 1
          : index - 1;
      } else {
        newIndex = index < this.state.photoArray.length - 1
          ? index + 1
          : 0;
      }
      // newIndex = index < this.state.photoArray.length - 1
      //   ? index + 1
      //   : 0;
      this.setState({activePhoto: newIndex});
    }
  }

  lightSwitch() {
    if (this.state.lightbox == false) {
      document.body.classList.add('lightbox');
      this.setState({lightbox: true});
    } else {
      document.body.classList.remove('lightbox');
      this.setState({lightbox: false});
    }
  }

  hideSwitch() {
    this.setState({
      showSwitch: 'hide'
    })
  }

  handleImageLoad = (e, i) => {
    let target = e.target;
    let overlayArray = this.state.photoArray;
    let react = this;
    
    setTimeout(function() {
      target.setAttribute("class", "show");
      if (react.state.page == "album-list") {
        //Show overlay after image load
        overlayArray[i].loaded = 'loaded';
        react.setState({
          photoArray: overlayArray
        });  
      }
    }, this.animationTime);
    
  }

  render() {
    return (
      <div className="page">
        <h1 className={this.state.page}>Photo</h1>
        <div className={"placeholder " + this.state.loading}>
          <Placeholder/>
        </div>
        <div className={"photo-container " + this.state.page}>
          <div className="row align-center">
            <div className="medium-11 column">
              <div className={"row " + this.state.layoutClass + " " + this.state.page + "__container small-collapse medium-uncollapse"}>
                {this.state.photoArray.map((data, i) => {
                  return (
                    <div key={i} className={"column align-middle " + (this.state.activePhoto != i
                      ? 'photo-hide'
                      : '')} >
                      <div className={"image-container"} onClick={this.handlePhotoClick.bind(this, i, this.state.photoArray, this.state.page)}>
                        {this.state.page !== "album-individual" && <Link className="image-link" to={{
                          pathname: "/photo/" + i,
                          state: {
                            page: 'album-individual'
                          }
                        }}>
                          <div className={"album-title-overlay " + data.loaded}>
                            {data.title && data.title.split(' ').slice(1, data.title.split(' ').length - 1).join(" ")}
                          </div>
                          <img onLoad={(e) => this.handleImageLoad(e, i)} src={data.url}></img>
                        </Link>}
                        {this.state.page == "album-individual" && <Link to={{
                          pathname: (i + 1) == this.state.photoArray.length
                            ? '/photo/' + this.state.activeAlbum + '/' + 0
                            : '/photo/' + this.state.activeAlbum + '/' + (i + 1),
                          state: {
                            page: 'album-individual'
                          }
                        }}>
                          <img onLoad={(e) => this.handleImageLoad(e, i)} src={data.url}></img>
                          <div className="photo-count">{(i + 1) + ' / ' + this.state.photoArray.length}</div>
                        </Link>
                      }
                      </div>
                    </div>
                  );
                })}
              </div>
              {this.state.page == 'album-individual' && <span className={"lightswitch " + this.state.showSwitch} onClick={this.lightSwitch.bind(this)}>
                {this.state.lightbox
                  ? 'lights on'
                  : 'lights off'}
              </span>
              }
              {this.state.page == 'album-individual' && <span className="back-link"><Link
                onClick = {this.hideSwitch.bind(this)}
                to={{
                pathname: "/photo",
                state: {
                  page: 'album-list'
                }
              }}>back</Link></span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Photo;
