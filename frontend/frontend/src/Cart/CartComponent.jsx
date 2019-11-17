import React from 'react';
import Navbar from "../components/NavBar";
import {connect} from "react-redux";
import {userService} from "../service";
import {clearCart} from "../js/actions";

const mapStateToProps = state => {
    return {albums: state.albums}
};

function mapDispatchToProps(dispatch) {
    return {
        clearCart: () => dispatch(clearCart())
    }
}

class CartComponentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: props.albums
        };

        this.placeOrder = this.placeOrder.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({albums: nextProps.albums});
    }

    placeOrder() {
        userService.placeOrder().then(
            order => {
                this.props.clearCart()
            }, error => {
                console.log(error);
            }
        )
    }

    render() {
        const albumsListContent = this.state.albums.map((album, key) => {
            return (
                <li className="list-group-item d-flex justify-content-between lh-condensed" key={key}>
                    <div>
                        <h6 className="my-0">{album.title}</h6>
                        <small className="text-muted">{album.description}</small>
                    </div>
                    <span className="text-muted">${album.price}</span>
                </li>
            )
        });

        let totalPrice = 0;
        for (let i = 0; i < this.state.albums.length; i++) {
            totalPrice += this.state.albums[i].price;
        }

        return (
            <div>
                <Navbar/>
                <main className={"mt-5 pt-4"}>
                    <div className="container wow fadeIn">

                        <h2 className="my-5 h2 text-center">Checkout</h2>

                        <div className="row">

                            <div className="col-md-10 mb-4">

                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Your cart</span>
                                    <span className="badge blue badge-pill ">{this.state.albums.length}</span>
                                </h4>

                                <ul className="list-group mb-3 z-depth-1">
                                    {albumsListContent}
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (USD)</span>
                                        <strong>${totalPrice}</strong>
                                    </li>
                                </ul>

                                <form className="card p-2">
                                    <button className="btn blue btn-md waves-effect m-0"
                                            type="button" onClick={this.placeOrder}>Place order
                                    </button>
                                </form>

                            </div>
                            <div className="col-md-2 mb-4">

                            </div>
                        </div>

                    </div>
                </main>

            </div>
        )
    }
}

const CartComponent = connect(mapStateToProps, mapDispatchToProps)(CartComponentPage);
export {CartComponent}