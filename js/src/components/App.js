import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';


import Header from "./layout/Header";


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container"></div>
            </Fragment>
        )
    }
}

ReactDOM.render(
    <App />
    , document.getElementById('app'));