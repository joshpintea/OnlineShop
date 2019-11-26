import React from "react";
import {albumService} from "../service";
import {clearCart, fetchCart} from "../js/actions";
import {connect} from "react-redux";
import {ToastH} from "./Toast";

function mapDispatchToProps(dispatch) {
    return {
        fetchInitial: (cart) => dispatch(fetchCart(cart))
    }
}

class AddToCartFormR extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: props.quantity,
            album: props.album,
            show: false,
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({album: nextProps.album, quantity: nextProps.quantity})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.quantity < 0) {
            return;
        }

        albumService.addToCart({album: this.state.album, quantity: this.state.quantity}).then(
            response => {
                this.setState({show:true, message: "Success"});
                this.props.fetchInitial(response);
            }, error => {
                console.log(error);
            }
        )
    }
    handleChange(e) {
        const {name, value} = e.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <form className={"md-form"} onSubmit={this.handleSubmit}>
                <input type={"number"} min={0} max={1000} name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                <button className="btn btn-primary btn-md my-0 p" type="submit"> Update
                    <i className="fas fa-shopping-cart ml-1"></i>
                </button>
            </form>
        )
    }
}
const AddToCartForm = connect(null, mapDispatchToProps)(AddToCartFormR);
export {AddToCartForm}