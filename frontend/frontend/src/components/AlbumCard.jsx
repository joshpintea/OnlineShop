import React from 'react';
import {albumService} from "../service";
import {connect} from "react-redux";
import {addAlbumToCart, fetchCart} from "../js/actions";
import {AddToCartForm} from "./AddToCartForm";

const mapStateToProps = state => {
    return {albumsInCart: state.albums}
};

function mapDispatchToProps(dispatch) {
    return {
        fetchInitial: cart => dispatch(fetchCart(cart))
    }
}


class AlbumCardMin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: props.album,
            albumsInCart: props.albumsInCart
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({album: nextProps.album, albumsInCart: nextProps.albumsInCart})
    }


    render() {
        const {album, albumsInCart} = this.state;
        let quantity = 0;
        for (let i = 0 ; i < albumsInCart.length; i++) {
            if (albumsInCart[i].album.id === album.id) {
                quantity = albumsInCart[i].quantity
            }
        }

        return (
            <div className="card" style={{height: 400, width: 300, margin: 20}}>
                <div className="view overlay">
                    <img src={album.album_image}
                         className="card-img-top"
                         alt=""/>
                </div>

                <div className="card-body text-center">
                    <a href={"/album/" + album.id} className="grey-text">
                        <h5>Album</h5>
                    </a>
                    <h5>
                        <strong>
                            <a href={"/album/" + album.id} className="dark-grey-text">{album.title}</a>
                        </strong>
                    </h5>

                    <h4 className="font-weight-bold blue-text">
                        <strong>{album.price} LEI</strong>
                    </h4>

                    <AddToCartForm quantity={quantity} album={album}/>

                </div>

            </div>
        )
    }
}
const AlbumCard = connect(mapStateToProps, mapDispatchToProps)(AlbumCardMin);

export {AlbumCard}