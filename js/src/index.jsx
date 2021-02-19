import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import actionCreater from './redux/actionCreators';
import toast from './components/toast';

window._SB.toast = toast;

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
.then(res => _SB.store.dispatch(actionCreater.setConfig(res)))
.catch(error => _SB.toast.error(
  "Error loading config file, some functions may not run, please reload."
  ));

ReactDOM.render(<Root />, document.getElementById('app'));

// Fetch with cache so, data is stored after fetch
// Customized fetch function
// only for JSON
function storedFetch(url){
  if(url in _SB.cache){
    return new Promise(function(resolve) {
      resolve(_SB.cache[url]);
    });
  }else{
    //Fetch and store
    return fetch(url)
    .then(res => res.json())
    .then((res)=>{
      _SB.cache[url]=res;
      return res;
    })
    .catch(error => _SB.toast.error(error.message));
  };
}

window._SB.storedFetch = storedFetch;

// Check if leaflet is loaded?
if (!window.L)
  _SB.toast.warning(
    "Leaflet not loaded, maps will not function, please reload."
  )
