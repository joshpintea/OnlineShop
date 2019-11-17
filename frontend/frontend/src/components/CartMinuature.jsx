import React from 'react';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {albums: state.albums}
};

class CartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: props.albums
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.state = {
            albums: nextProps.albums
        }
    }


    render() {
        const {albums} = this.state;
        return (
            <a className="nav-link waves-effect" href={"/cart"}>
                <span className="badge blue z-depth-1 mr-1"> {albums.length} </span>
                <i className="fas fa-shopping-cart"/>
                <span className="clearfix d-none d-sm-inline-block"> Cart </span>
            </a>
        )
    }
}



const CartMinuature = connect(mapStateToProps)(CartComponent);
export {CartMinuature};