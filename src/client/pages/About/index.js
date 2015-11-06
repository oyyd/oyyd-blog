import React from 'react';
import SimpleApp from '../../components/SimpleApp';

class About extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <SimpleApp>
        <div>About Me</div>
      </SimpleApp>
    )
  }
}

export default About;
