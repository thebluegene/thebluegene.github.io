import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Photo from './components/Photo';
import Blog from './components/Blog';
import Code from './components/Code';
import Film from './components/Film';

window.React = React;

render((
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="/code" component={ Code }/>
      <Route path="/photo" component={ Photo }/>
      <Route path="/photo/:album" component={ Photo }/>
      <Route path="/photo/:album/:item" component={ Photo }/>
      <Route path="/blog" component={ Blog }/>
      <Route path="/film" component={ Film }/>
    </Route>
  </Router>
), document.getElementById('content'));
