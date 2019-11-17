import React from 'react';
import Navbar from "../components/NavBar";
import {AlbumsListing} from "../components/AlbumsListing";
import {albumService} from "../service";
import queryString from 'query-string';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        this.state = {
            albumsResponse: {},
            page: props.match.params.page,
            error: "",
            searchQuery: params.search_value || "",
            filter: (params.search_value !== undefined)
        };

        this.getAlbums = this.getAlbums.bind(this);
    }

    getAlbums(page=-1) {
        let nextPage = page;
        if (page === -1) {
            nextPage = parseInt(this.props.match.params.page || 1);
        }

        const searchQuery = (this.state.filter) ? this.state.searchQuery : "";
        albumService.getAll(nextPage, searchQuery).then(
            albumsResponse => {
                albumsResponse.page = nextPage;
                this.setState({albumsResponse:albumsResponse})
            }, error => {
                this.setState({error: error});
            }
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.state === "refresh") {
            this.getAlbums(nextProps.location.page);
        }
    }

    componentDidMount() {
        this.getAlbums();
    }

    render() {
        const {albumsResponse, error} = this.state;
        return (
            <div>
                <Navbar/>

                <div className={"page-content"}>
                    {error &&
                    <div className={"alert alert-danger"}>{error}</div>
                    }
                    {!error &&
                    <AlbumsListing albumsResponse={albumsResponse}
                                   filter={this.state.filter}
                                    searchQuery={this.state.searchQuery}/>
                    }
                </div>

            </div>
        )
    }
}


export {HomeComponent};