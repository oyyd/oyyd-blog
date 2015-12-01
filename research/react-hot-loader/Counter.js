import React from 'react';

class Counter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  plusOne() {
    this.setState({
      count: this.state.count + this.props.valueAddEachClick,
    });
  }

  render() {
    return (
      <div>
        <label>Value: {this.state.count}</label>
        <button onClick={this.plusOne.bind(this)}>+{this.props.valueAddEachClick}</button>
      </div>
    );
  }
}

export default Counter;
