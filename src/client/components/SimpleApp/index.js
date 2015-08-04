import React from 'react';
import {RouteHandler} from 'react-router';

let SimpleApp = React.createClass({
  render(){
    return (
      <div>
        <h1>SimpleApp</h1>
        <RouteHandler/>
      </div>
    )
  }
});

export default SimpleApp;
