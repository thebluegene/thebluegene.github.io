import React from 'react';

const Social = () => (
  <div className="social-media">
    <ul className="social-media__list">
      <li className="social-media__list-item">
        <a href="https://www.flickr.com/people/thebluegene/">
          <i className="fa fa-lg fa-flickr" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-media__list-item">
        <a href="https://vimeo.com/thebluegene">
          <i className="fa fa-lg fa-vimeo" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-media__list-item">
        <a href="https://www.linkedin.com/in/geneang/">
          <i className="fa fa-lg fa-linkedin-square" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-media__list-item">
        <a href="https://www.github.com/thebluegene/">
          <i className="fa fa-lg fa-github-alt" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-media__list-item">
        <a href="mailto:gene.ang92@gmail.com">
          <i className="fa fa-lg fa-envelope" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
);

export default Social;
