const React = require('react');
const mui = require('material-ui');
const Navigation = require('react-router').Navigation;

var LeftNav = React.createClass({
  mixins: [Navigation],
  menuItems:[{ 
    type: mui.MenuItem.Types.SUBHEADER,
    text: 'Posts' 
  },{ 
    route: 'PostsList',
    text: 'Posts' 
  },{ 
    route: 'PostsList.Wordpress',
    text: 'Wordpress Posts'
  },{ 
    type: mui.MenuItem.Types.SUBHEADER,
    text: 'Showcase'
  },{ 
    route: 'ShowCases',
    text: 'Show Cases'
  },{
    route: 'AboutBlog',
    text: 'About oyyd-blog'
  },{
    route: 'AboutMe',
    text: 'About Me'
  },{ 
    type: mui.MenuItem.Types.SUBHEADER,
    text: 'Links' 
  },{ 
    type: mui.MenuItem.Types.LINK,
    payload: 'https://github.com/oyyd',
    text: 'oyyd@github' 
  }],
  componentDidMount(){
    if(this.props.isOpen){
      this.refs.leftNav.toggle();
    }
  },
  getDefaultProps(){
    return{
      isOpen: false
    };
  },
  openNav(){
    this.refs.leftNav.toggle();
  },
  itemClicked(e, selectedIndex, menuItem){
    if(menuItem.route){
      this.transitionTo(menuItem.route);
    }
  },
  render(){
    return(
      <mui.LeftNav ref="leftNav" docked={false} menuItems={this.menuItems} onChange={this.itemClicked}
        header={<mui.AppBar title='Navigation' />} showMenuIconButton={false}/>
    )
  }
});

module.exports = LeftNav;