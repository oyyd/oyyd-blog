import ReactDOM from 'react-dom';
import createApp from './createApp';
import createStore from './state/createStore';

ReactDOM.render(
  createApp(createStore(window.__INITIAL_STATE__), 'client'), // eslint-disable-line
  document.getElementById('main')
);
