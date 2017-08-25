import React from 'react';

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      projectArray: [
        { 'title' : '7 Years of Photography' , 'styles' : {fontFamily:'Marcellus SC', fontSize:'28px'} },
        { 'title' : 'This Website' , 'styles' : {fontFamily:'Fredericka the Great', fontSize:'28px'} }
      ]
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="small-12 columns">
          {this.state.projectArray.map((data, i) => {
            return (
              <div key={i} className="code">
                <div className="code__title" style={ data.styles }>
                  { data.title }
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    )
  }
}

export default Code;
