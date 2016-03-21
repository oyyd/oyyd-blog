import React from 'react';

const { string, number, } = React.PropTypes;

const START_RATIO = 1.3,
  END_RATIO= 1,
  ANIMATION_TIME = 24;

function getZeroIfNaN(number) {
  if (isNaN(number)) {
    return 0;
  }

  return number;
}

class PerspectiveImg extends React.Component {
  constructor(props) {
    super(props);

    const { width, height, containerWidth, containerHeight, } = props;

    this.ratio = START_RATIO;

    let imgStyle = Object.assign({}, style,
      this.getImgStyle(true, props)
    );

    this.state = {
      start: false,
      show: false,
      imgStyle,
    };

    this.getImgStyle = this.getImgStyle.bind(this);
  }

  componentDidMount() {
    this.setState({
      start: true,
    });
  }

  componentWillReceiveProps(props) {
    this.state = {
      imgStyle: Object.assign({}, style,
        this.getImgStyle(this.state.show, props)
      ),
    };
  }

  getImgStyle(show, props) {
    props = props || this.props;

    const {
      width, height, containerWidth, containerHeight,
    } = props;
    const { ratio, } = this;

    let newWidth = containerWidth * ratio;
    let newHeight = newWidth * height / width;

    return {
      top: getZeroIfNaN((containerHeight - newHeight) / 2),
      left: getZeroIfNaN((containerWidth - newWidth) / 2),
      width: getZeroIfNaN(newWidth),
      height: getZeroIfNaN(newHeight),
    };
  }

  startAnimation() {
    this.ratio = END_RATIO;

    this.setState({
      show: true,
      imgStyle: Object.assign({
        transition: `${ANIMATION_TIME}s`,
      }, style, this.getImgStyle(this.state.show)),
    });
  }

  render() {
    return (
      <img onLoad={this.startAnimation.bind(this)}
        style={this.state.imgStyle}
        src={this.state.start ? this.props.src : null}/>
    );
  }
}

PerspectiveImg.propTypes = {
  src: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  containerWidth: number.isRequired,
  containerHeight: number.isRequired,
};

const style = {
  position: 'absolute',
};

export default PerspectiveImg;
