import React from 'react';


const Photo = () => {
  let url, photosList;
  $.get('https://api.flickr.com/services/rest/?method=flickr.urls.getUserPhotos&api_key=a7444d790bdc74fd18e75fc7d64a4b28&user_id=46863234%40N05&format=json&nojsoncallback=1&auth_token=72157674078150550-fccd93f1b0568a68&api_sig=8ecd43573f1776014e54f6d429e384dd', function(data){
    url = data.user.url;
  });

  $.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a7444d790bdc74fd18e75fc7d64a4b28&photoset_id=72157675263315405&user_id=46863234%40N05&format=json&nojsoncallback=1&auth_token=72157674078150550-fccd93f1b0568a68&api_sig=24428f4ee809bcc1f9b8366ccfc43dd0', function(data){
    let photos = data.photoset;
    let photosArray = [];
    for(let i = 0; i < photos.photo.length; i++){
      photosArray.push(url+photos.photo[i].id);
    }
    photosList = photosArray.map(function(url){
      return <div className="column"><img src={url}></img></div>;
    });
  });


  return (
    <div>
      <div className="row">
        <div className="small-12 columns">
          <h1 className="photo-title">Photographer</h1>
        </div>
      </div>
      <div className="small-up-3">
        { photosList }
      </div>
    </div>
  );
};
export default Photo;
