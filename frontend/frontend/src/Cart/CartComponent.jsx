import React from 'react';
import Navbar from "../components/NavBar";
import {connect} from "react-redux";
import {albumService, userService} from "../service";
import {clearCart, fetchCart} from "../js/actions";

const mapStateToProps = state => {
    return {albums: state.albums}
};

function mapDispatchToProps(dispatch) {
    return {
        clearCart: () => dispatch(clearCart()),
        fetchInitial: (cart) => dispatch(fetchCart(cart))
    }
}

class ProductsFormMinuature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albumAndQuantity: props.albumAndQuantity,
            quantity: props.albumAndQuantity.quantity
        };

        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
    }

    submit(e) {
        e.preventDefault();

        albumService.addToCart({album: this.state.albumAndQuantity.album, quantity: this.state.quantity}).then(
            response => {
                this.props.fetchInitial(response);
            }, error => {
                console.log(error);
            }
        )
    }

    change(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {albumAndQuantity} = this.state;

        return (
            <li className="list-group-item d-flex justify-content-between lh-condensed">
                <form onSubmit={this.submit} className={"md-form"}>
                    <h6 className="my-0">{albumAndQuantity.album.title}</h6>
                    <input type={"number"} name={"quantity"} value={this.state.quantity} onChange={this.change}/>
                    <button className="btn btn-primary btn-md my-0 p" type="submit"> Update
                        <i className="fas fa-shopping-cart ml-1"></i>
                    </button>
                </form>
            </li>
        )
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
        const albumsListContent = this.state.albums.map((album_and_quantity, key) => {
            return (
                <li className="list-group-item d-flex justify-content-between lh-condensed" key={key}>
                    <div>
                        <h6 className="my-0">{album_and_quantity.quantity} x {album_and_quantity.album.title}</h6>
                        <small className="text-muted">{album_and_quantity.album.description.substring(0, 10)}</small>
                    </div>
                    <span className="text-muted">LEI {album_and_quantity.album.price * album_and_quantity.quantity}</span>
                </li>
            )
        });
        let totalPrice = 0;
        for (let i = 0; i < this.state.albums.length; i++) {
            totalPrice += this.state.albums[i].album.price * this.state.albums[i].quantity;
        }

        return (
            <div>
                <Navbar/>
                <main className={"mt-5 pt-4"}>
                    <div className="container wow fadeIn">

                        <h2 className="my-5 h2 text-center">Checkout</h2>

                        <div className="row">

                            <div className="col-md-5 mb-3">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Products</span>
                                    <span className="badge blue badge-pill ">{this.state.albums.length}</span>
                                </h4>

                                <ul className="list-group mb-3 z-depth-1">
                                    {this.state.albums.map((albumAndQuantity, key) => {
                                        return (<ProductsFormMinuature key={albumAndQuantity.id} albumAndQuantity={albumAndQuantity} fetchInitial={this.props.fetchInitial}/>)
                                    })}
                                </ul>
                            </div>
                            <div className="col-md-7 mb-9">

                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Your cart</span>
                                    <span className="badge blue badge-pill ">{this.state.albums.length}</span>
                                </h4>

                                <ul className="list-group mb-3 z-depth-1">
                                    {albumsListContent}
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (LEI)</span>
                                        <strong>LEI {totalPrice}</strong>
                                    </li>
                                </ul>

                                <form className="card p-2">
                                    <button className="btn blue btn-md waves-effect m-0"
                                            type="button" onClick={this.placeOrder}>Place order
                                    </button>
                                </form>

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