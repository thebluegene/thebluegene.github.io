import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import About from './components/About';
import Photo from './components/Photo';
import Film from './components/Film';
import Blog from './components/Blog';
import Code from './components/Code';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/about" component={About} />
      <Route path="/code" component={Code} />
      <Route path="/photo" component={Photo} />
      <Route path="/photo/:album" component={Photo}/>
      <Route path="/blog" component={Blog} />
    </Route>
  </Router>), document.getElementById('content')
);
