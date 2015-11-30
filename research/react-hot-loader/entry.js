import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import SimpleProxy from './SimpleProxy';

const valueAddEachClick = 2;

function updateCounter(valueAddEachClick, proxy) {
  const Component = proxy.getComponent();

  ReactDOM.render(
    <Component initialCount={10} valueAddEachClick={valueAddEachClick}/>,
    document.getElementById('main')
  );
}

if (module.hot) {
  module.hot.data = module.hot.data || {};
  let {proxy} = module.hot.data;

  if (!proxy) {
    proxy = new SimpleProxy(Counter);
  } else {
    proxy.update(Counter);
  }

  updateCounter(valueAddEachClick, proxy);

  module.hot.accept();

  module.hot.dispose(function(data) {
    // replace __before__
    data.proxy = proxy;
  });
}
