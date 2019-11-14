

import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {LoginComponent} from "../Login";
import {RegisterComponent} from "../Register";

class App extends React.Component {
    render() {

        return (
            <div className={"container"}>
                <div className={""}>
                    <Router>
                        <Route path={'/login'} component={LoginComponent}/>
                        <Route path={'/register'} component={RegisterComponent}/>
                    </Router>
                </div>
            </div>
        )
    }
}

export { App };