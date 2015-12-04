import React from 'react';
import ReactDOM from 'react-dom';

import SayHello from './SayHello';

const name = 'world';

function renderComponent(RootComponent) {
  ReactDOM.render(
    <RootComponent name={name}/>,
    document.getElementById('main')
  );
}

if (module.hot) {
  module.hot.accept();
  renderComponent(SayHello);
}
