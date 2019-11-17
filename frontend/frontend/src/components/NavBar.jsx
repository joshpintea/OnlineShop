
import React from 'react';
import {CartMinuature} from "./CartMinuature";
import {userService} from "../service";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const {name, value} = e.target;

        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.searchValue) {
            return;
        }

        window.location.href = "/home/1?search_value=" + this.state.searchValue;
    }

    render() {
        return (
            <form className={"form"} onSubmit={this.handleSubmit}>
                <input type={'text'} placeholder={"Search"} name={"searchValue"} value={this.state.searchValue} onChange={this.handleChange}/>
                <button className={"blue"}>Search</button>
            </form>
        )
    }
}

const Navbar = ()=>{
    return(

        <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
            <div className="container">

                <a className="navbar-brand waves-effect" href="/home">
                    <strong className="blue-text">Online shop</strong>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link waves-effect" href="/home">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>

                    <SearchForm/>

                    <ul className="navbar-nav nav-flex-icons">
                        <li className="nav-item">
                            <CartMinuature/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect" onClick={() => userService.logout()}>
                            <i className="fas fa-sign-out-alt"/>
                            <span className="clearfix d-none d-sm-inline-block"> Log out </span>
                            </a>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
    )
};

export default Navbar;