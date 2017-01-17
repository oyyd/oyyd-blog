// TODO:
import React, { Component } from 'react';

const CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  left: 0,
  top: 0,
};

const BG_STYLE = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const MASK_STYLE = {
  zIndex: 10,
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  backgroundColor: '#000',
  opacity: 0.5,
};

const IMAGE_STYLE = {
  backgroundColor: '#FFF',
  zIndex: 100,
  position: 'absolute',
  width: '100%',
  overflow: 'auto',
  margin: 'auto',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

class ImageViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      visible: false,
    };
  }

  activeImage(url) {
    this.setState({
      url,
      visible: true,
    });
  }

  render() {
    const { visible, url } = this.state;

    const containerStyle = Object.assign({}, CONTAINER_STYLE, visible ? null : {
      display: 'none',
    });

    return (
      <div
        style={containerStyle}
      >
        <div
          style={BG_STYLE}
          onClick={() => {
            console.log('clicked');
            this.setState({ visible: false });
          }}
        >
          <div style={MASK_STYLE} />
          <img style={IMAGE_STYLE} alt="viewer" src={url} />
        </div>
      </div>
    );
  }
}

export default ImageViewer;
