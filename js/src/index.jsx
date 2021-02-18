import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
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
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// Get config from server and set it
fetch("./get_config")
.then(res => res.json())
.then(res => _SB.store.dispatch(actionCreater.setConfig(res)));

ReactDOM.render(<Root />, document.getElementById('app'));
