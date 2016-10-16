import React from 'react';
import { Link } from 'react-router';

// const App = ({ children }) => (
//   <div>
//     <header>
//       <h1>React Starterify {version}</h1>
//       <Link to="/about">About</Link>
//       <Link to="/poweredby">Powered by</Link>
//     </header>
//     <section>
//       {children || 'Welcome to React Starterify'}
//     </section>
//   </div>
// );


const App = ({ children }) => (
  <div>
    {children ||
      <div className="row expanded home-hero">
        <div className="small-12 columns">
          <div className="home-content">
            <h1 className="main-title"> Gene Ang </h1>
            <h2 className="sub-title">Front-End <Link to="/code" className="code-link">Developer</Link> for Vonnda,</h2>
            <h2 className="sub-title"><Link to="/photo" className="photo-link">Photographer</Link> and <Link to="/film" className="film-link">Filmmaker</Link> for fun,</h2>
            <h2 className="sub-title">And some other stuff</h2>
          </div>
        </div>
      </div>
    }
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
