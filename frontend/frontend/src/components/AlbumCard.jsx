import React from 'react';
import {albumService} from "../service";
import {connect} from "react-redux";
import {addAlbumToCart} from "../js/actions";
import {imageUtil} from "../util";

const mapStateToProps = state => {
    return {albumsInCart: state.albums}
};

function mapDispatchToProps(dispatch) {
    return {
        addAlbumToCart: cart => dispatch(addAlbumToCart(cart))
    }
}

class AlbumCardMin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: props.album,
            albumsInCart: props.albumsInCart
        };

        this.addToCart = this.addToCart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({album: nextProps.album, albumsInCart: nextProps.albumsInCart})
    }

    addToCart() {
        albumService.addToCart(this.state.album).then(
            response => {
                this.props.addAlbumToCart(this.state.album);
            }, error => {
                console.log(error);
            }
        )
    }

    render() {
        const {album, albumsInCart} = this.state;

        let alreadyInCard = false;
        for (let i = 0 ; i < albumsInCart.length; i++) {
            if (albumsInCart[i].id === album.id) {
                alreadyInCard = true
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
                        <strong>{album.price} $</strong>
                    </h4>

                    <button onClick={this.addToCart} disabled={alreadyInCard}>Add to cart</button>

                </div>

            </div>
        )
    }
}
const AlbumCard = connect(mapStateToProps, mapDispatchToProps)(AlbumCardMin);

export {AlbumCard}