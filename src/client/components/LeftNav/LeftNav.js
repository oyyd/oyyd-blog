const React = require('react');
const mui = require('material-ui');
const Navigation = require('react-router').Navigation;

var LeftNav = React.createClass({
  mixins: [Navigation],
  menuItems:[{ 
    type: mui.MenuItem.Types.SUBHEADER,
    text: 'Navigation' 
  },{ 
    route: 'PostsList',
    text: 'Posts' 
  },{ 
    route: 'PostsList.Wordpress',
    text: 'Wordpress Posts'
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
        header={<mui.AppBar title='OYYD_Blog' />} showMenuIconButton={false}/>
    )
  }
});

module.exports = LeftNav;