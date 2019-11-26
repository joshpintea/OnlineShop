import React from 'react';
import {connect} from "react-redux";
import {albumService} from "../service";
import {addAlbumToCart} from "../js/actions";
import {imageUtil} from "../util";
import {AddToCartForm} from "./AddToCartForm";


const mapStateToProps = state => {
    console.log(state.albums);
    return {albumsInCart: state.albums};
};

function mapDispatchToProps(dispatch) {
    return {
        addAlbumToCart: cart => dispatch(addAlbumToCart(cart))
    }
}

class AlbumDetailsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: props.album,
            albumsInCart: props.albumsInCart
        };

        this.addToCart = this.addToCart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("next", nextProps);
        this.setState({album: nextProps.album,
            albumsInCart: nextProps.albumsInCart});
    }

    createSongsTable(columns, objects) {

        let tableColumns = columns.map ( (column) => {
            return (
                <th scope={"col"}>{column}</th>
            )
        });

        let tableColumnsFunc = () => {
            return (
                <tr>
                    {tableColumns}
                </tr>
            )
        };

        let tableData = objects.map ( (objectModel) => {
            let dataColumns = columns.map( (column) => {
                return (
                    <td>
                        {objectModel[column]}
                    </td>
                )
            });

            return (
                <tr>
                    {dataColumns}
                </tr>
            )
        });

        return (
            <table className={"table"}>
                <thead>
                {tableColumnsFunc()}
                </thead>
                <tbody>
                {tableData}
                </tbody>
            </table>
        )
    }

    addToCart(e) {
        e.preventDefault();
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
        let quantity = 0;

        for (let i = 0 ; i < albumsInCart.length; i++) {
            if (albumsInCart[i].album.id === album.id) {
                quantity = albumsInCart[i].quantity;
            }
        }

        return (
            <div>
            {album.id !== undefined &&
            <div className="container dark-grey-text mt-5">

                        <div className="row wow fadeIn">

                            <div className="col-md-6 mb-4">

                                <img src={album.album_image}
                                     className="img-fluid" alt=""/>

                            </div>

                            <div className="col-md-6 mb-4">

                                <div className="p-4">

                                    <div className="mb-3">
                                        <a href="">
                                            <span className="badge blue mr-1">{album.album_type}</span>
                                        </a>
                                    </div>

                                    <p className="lead">
                                      <span className="mr-1">
                                      </span>
                                        <span>${album.price}</span>
                                    </p>

                                    <p className="lead font-weight-bold">Description</p>

                                    <p>{album.description}</p>

                                    <AddToCartForm album={album} quantity={quantity}/>

                                </div>

                            </div>

                        </div>

                        <hr/>

                        <div className="row d-flex justify-content-center wow fadeIn">

                            <div className="col-md-6 text-center">

                                <h4 className="my-4 h4">Songs</h4>

                                {this.createSongsTable(['artist_name', 'title', 'length'], album.songs)}

                            </div>

                        </div>

                    </div>
            }
            </div>
        )
    }
}
const AlbumDetails = connect(mapStateToProps, mapDispatchToProps)(AlbumDetailsComponent);
export {AlbumDetails};
