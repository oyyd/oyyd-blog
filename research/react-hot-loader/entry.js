import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

const valueAddEachClick = 2;

function updateCounter(valueAddEachClick) {
  ReactDOM.render(
    <Counter initialCount={10} valueAddEachClick={valueAddEachClick}/>,
    document.getElementById('main')
  );
}

updateCounter(valueAddEachClick);

if (module.hot) {
  module.hot.accept(function(err) {
    console.log(err.message);
  });

  module.hot.dispose(function(data) {
    updateCounter(valueAddEachClick);
  });
}
