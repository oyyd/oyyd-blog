import React from 'react';

import CONSTANTS from '../../CONSTANTS';
import isBrowser from '../../utils/isBrowser';

const {string} = React.PropTypes;

const Disqus = React.createClass({
  propTypes: {
    initialIdentifier: string,
    initialTitle: string,
    initialUrl: string,
  },
  getDefaultProps() {
    return {
      initialIdentifier: CONSTANTS.DISQUS.DEFAULT_IDENTIFIER,
      initialTitle: CONSTANTS.DISQUS.DEFAULT_TITLE,
      initialUrl: !isBrowser() ? '' : location.href,
    };
  },

  componentDidMount() {
    this.requireInit();

    // if(window.DISQUS){
    //   this.configInit();
    // }else{
    //   this.requireInit();
    // }
  },

  requireInit() {
    if (!isBrowser()) {
      return;
    }

    // jscs:disable
    window.disqus_shortname = CONSTANTS.DISQUS.SHORT_NAME;
    window.disqus_identifier = this.props.initialIdentifier;
    window.disqus_title = this.props.initialTitle;
    window.disqus_url = this.props.initialUrl;

    (function() {
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    // jscs:enable
  },

  // configInit(){
  //   window.DISQUS.reset({
  //     reload: true,
  //     config: () => {
  //       this.page.identifier = this.props.initialIdentifier;
  //       this.page.title = this.props.initialTitle;
  //       this.page.url = this.props.initialUrl;
  //     }
  //   });
  // },
  // disqusTempData: {},
  // resetConfig(identifier, title, url){
  //   if(window.DISQUS){
  //     if(!identifier){
  //       return;
  //     }
  //     if(!url){
  //       url = location.href;
  //     }
  //     if(!title){
  //       title = document.title;
  //     }
  //     window.DISQUS.reset({
  //       reload: true,
  //       config: function () {
  //         this.page.identifier = identifier;
  //         this.page.title = title;
  //         this.page.url = url;
  //       }
  //     });
  //   }else{
  //     this.disqusTempData = {identifier, title, url};
  //     this.startCheckingTimer();
  //   }
  // },
  // disqusInited:false,
  // startCheckingTimer(){
  //   if(!this.disqusInited){
  //     setTimeout(() => {
  //       if(window.DISQUS){
  //         this.disqusInited = true;
  //         const {identifier, title, url} = this.disqusTempData;
  //         window.DISQUS.reset({
  //           reload: true,
  //           config: () => {
  //             this.page.identifier = identifier;
  //             this.page.title = title;
  //             this.page.url = url;
  //           }
  //         });
  //       }else{
  //         this.startCheckingTimer();
  //       }
  //     }, 1000);
  //   }
  // },
  render() {
    return (
      <div className='blog-disqus' id='disqus_thread'></div>
    );
  },
});

export default Disqus;
