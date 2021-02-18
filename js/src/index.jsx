import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import config from './config.json';
import actionCreater from './redux/actionCreators';
import toast from './components/toast';

// Store global variables too for easy access in
window._SB = {
  toast,
}

import App from './components/App';
const Root = props => {
  const store = configureStore();
  window._SB.store = store;
  store.dispatch(actionCreater.setConfig(config));
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('app'));
