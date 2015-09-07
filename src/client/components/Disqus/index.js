import React from 'react/addons';

const Disqus = React.createClass({
  componentDidMount(){
    /* * * CONFIGURATION VARIABLES * * */
    // Required: on line below, replace text in quotes with your forum shortname
    var disqus_shortname = 'oyyd';
    window.disqus_identifier = '123123123123';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  },
  render(){
    return (
      <div className="blog-disqus" id="disqus_thread"></div>
    )
  }
});

export default Disqus;
