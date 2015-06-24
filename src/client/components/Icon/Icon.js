const React = require('react');
const $ = require('jquery');

// ic_alarm_on_24px.svg
var Icon = React.createClass({
  srcPreFix:'/static/svg',
  getDefaultProps(){
    return {
      picColor: '#fff',
      picSize: 24
    }
  },
  componentDidMount(){
    if(this.props.picSrc){
      let src = this.srcPreFix;
      if(this.props.picSrc[0] !== '/'){
        src = src + '/';
      }
      src = src + this.props.picSrc;

      $.get(src, function(data){
        let $svg = $(data).find('svg');
        $svg.css({
          fill: this.props.picColor,
          width: this.props.picSize,
          height: this.props.picSize
        });
        $(React.findDOMNode(this.refs.wrapper)).append($svg);
      }.bind(this), 'xml');
    }
  },
  render(){
    return (
      <span className="blog-Icon" ref="wrapper" />
    );
  }
});

module.exports = Icon;