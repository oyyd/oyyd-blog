import React from 'react';

const color = 'black';

class SayHello extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{color: color}}>Hello, {this.props.name}!</div>
    );
  }
}

export default SayHello;
