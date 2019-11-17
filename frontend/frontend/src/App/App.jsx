

import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {LoginComponent} from "../Login";
import {RegisterComponent} from "../Register";
import {HomeComponent} from "../Home";
import './bootstrap.min.css';
import './mdb.lite.min.css';
import './style.min.css';
import './index.css';
import {CartComponent} from "../Cart";
import {AlbumComponent} from "../AlbumPage";
import {cartService, constants} from "../service";
import {fetchCart} from "../js/actions";
import {connect} from "react-redux";
import {PrivateRoute} from "../components";


function mapDispatchToProps(dispatch) {
    return {
        fetchCart: cart => dispatch(fetchCart(cart))
    }
}

class AppFetch extends React.Component {

    componentDidMount() {
        cartService.getLoggedUserCart().then(
            cart => {
                this.props.fetchCart(cart);
            }
        )
    }

    render() {
        return (
            <div className={"container"}>
                <div className={""}>
                    <Router>
                        <Route path={'/login'} component={LoginComponent}/>
                        <Route path={'/register'} component={RegisterComponent}/>
                        <PrivateRoute path={'/home/:page?'} component={HomeComponent} after={constants.savedToken} redirect={"/login"}/>
                        <PrivateRoute path={'/cart'} component={CartComponent} after={constants.savedToken} redirect={"/login"}/>
                        <PrivateRoute path={'/album/:id'} component={AlbumComponent} after={constants.savedToken} redirect={"/login"}/>
                    </Router>
                </div>
            </div>
        )
    }
}

const App = connect(
    null,
    mapDispatchToProps
)(AppFetch);

export { App };