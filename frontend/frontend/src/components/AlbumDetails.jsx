import React from 'react';
import {connect} from "react-redux";
import {albumService} from "../service";
import {addAlbumToCart} from "../js/actions";
import {imageUtil} from "../util";


const mapStateToProps = state => {
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
        this.setState({album: nextProps.album, albumsInCart: nextProps.albumsInCart});
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
        let alreadyInCard = false;
        for (let i = 0 ; i < albumsInCart.length; i++) {
            if (albumsInCart[i].id === album.id) {
                alreadyInCard = true
            }
        }
        console.log(album);
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

                                    <form className="d-flex justify-content-left">
                                        <button className="btn btn-primary btn-md my-0 p" type="submit" disabled={alreadyInCard} onClick={this.addToCart}> Add to cart
                                            <i className="fas fa-shopping-cart ml-1"></i>
                                        </button>

                                    </form>

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
