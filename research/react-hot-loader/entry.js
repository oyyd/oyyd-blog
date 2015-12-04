import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './Counter';
import createProxy from 'react-proxy';
import deepForceUpdate from 'react-deep-force-update';

if (module.hot) {
  module.hot.data = module.hot.data || {};
  let {proxy, rootInstance} = module.hot.data;

  if (!proxy) {
    proxy = createProxy(Counter);
    const Component = proxy.get();

    rootInstance = ReactDOM.render(
      <Component initialCount={10} valueAddEachClick={2}/>,
      document.getElementById('main')
    );
  } else {
    proxy.update(Counter);
    deepForceUpdate(rootInstance);
  }

  module.hot.accept();

  module.hot.dispose(function(data) {
    // replace __before__
    data.proxy = proxy;
    data.rootInstance = rootInstance;
  });
}
