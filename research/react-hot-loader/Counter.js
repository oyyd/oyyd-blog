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
      count: this.state.count + this.props.valueAddEachClick * 2,
    });
  }

  render() {
    const valueAddEachClick = this.props.valueAddEachClick * 2;
    return (
      <div>
        <label>Value: {this.state.count}</label>
        <button onClick={this.plusOne.bind(this)}>+{valueAddEachClick}</button>
      </div>
    );
  }
}

export default Counter;
