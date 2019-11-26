import React from 'react';
import {AlbumCard} from "./AlbumCard";

import './grid-stupid.css'
import {Link} from "react-router-dom";
import {constants, userService} from "../service";

class AlbumsListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albumsResponse: {},
            filter: props.filter,
            searchQuery: props.searchQuery
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            albumsResponse: nextProps.albumsResponse,
            filter: nextProps.filter,
            searchQuery: nextProps.searchQuery
        });
    }

    clearFilters() {
        window.location.href = "/home/1"
    }

    render() {
        let albumsContent = '';
        if (this.state.albumsResponse.results !== undefined) {
            albumsContent = this.state.albumsResponse.results.map((album, key) => {
                return (
                    <AlbumCard album={album} key={key}/>
                )
            });
        }

        const startIndex = (this.state.albumsResponse.page-1) * constants.pagination.perPage + 1;
        let endIndex = this.state.albumsResponse.page * constants.pagination.perPage;
        if (endIndex > this.state.albumsResponse.count) {
            endIndex = this.state.albumsResponse.count;
        }

        return (
            <div className="albums-listing">
                {this.state.filter &&
                <div >
                    Search result for: {this.state.searchQuery} <br/>
                    <button onClick={this.clearFilters}>Clear filters</button>
                    <br/>
                </div>
                }
                {this.state.albumsResponse.results !== undefined && this.state.albumsResponse.results.length === 0 &&
                    <div className={"alert alert-danger"}>
                        No products found
                    </div>
                }
                {this.state.albumsResponse.results !== undefined && this.state.albumsResponse.results.length > 0 &&
                <div className={"grid-container"}>
                    {albumsContent}
                </div>
                }
                {this.state.albumsResponse.results !== undefined && this.state.albumsResponse.results.length > 0 &&
                <div className={"pagination"} style={{float:"right"}}>
                    {!constants.pagination.defaultPagination &&
                    <div>Showing from {startIndex} to {endIndex} of {this.state.albumsResponse.count}</div>
                    }
                    <Link to={{
                        pathname: '/home/' + (this.state.albumsResponse.page - 1) + ((this.state.filter) ? "?search_value=" + this.state.searchQuery : ""),
                        state: "refresh",
                        page: (this.state.albumsResponse.page - 1)
                    }}
                          className={(this.state.albumsResponse.previous === null) ? 'disabled-link nav-link waves-effect' : 'nav-link waves-effect'}>
                        <i className="fas fa-arrow-left"/>
                    </Link>
                    <Link to={{
                        pathname: '/home/' + (this.state.albumsResponse.page + 1) + ((this.state.filter) ? "?search_value=" + this.state.searchQuery : ""),
                        state: "refresh",
                        page: (this.state.albumsResponse.page + 1)
                    }}
                          className={(this.state.albumsResponse.next === null) ? 'disabled-link nav-link waves-effect' : 'nav-link waves-effect'}>
                        <i className="fas fa-arrow-right"/>
                    </Link>
                </div>
                }
            </div>
        )
    }
}

export {AlbumsListing};