import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import efileupload from './efileupload'
import finfo from './finfo'
import mpage from './mpage'
import slayerediting from './slayerediting'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <nav className="navbar fixed-top navbar-expand-sm navbar navbar-dark bg-dark">
                        <NavLink className="navbar-brand" to="">Project</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink className="nav-item nav-link " to="/efileupload">Excel File Upload </NavLink>
                                <NavLink className="nav-item nav-link" to="/finfo">Footing Info</NavLink>
                                <NavLink className="nav-item nav-link" to="/mpage">Map Page</NavLink>
                                <NavLink className="nav-item nav-link " to="/slayerediting">Soil Layer Editing</NavLink>
                            </div>

                        </div>
                    </nav>
                    <br /><br /> <br />
                    <Route path="/efileupload" component={efileupload} />
                    <Route path="/finfo" component={finfo} />
                    <Route path="/mpage" component={mpage} />
                    <Route path="/slayerediting" component={slayerediting} />
                </div>
            </HashRouter >
        )
    }
}

export default App
