import React from 'react'
import {AlbumDetails} from "../components/AlbumDetails";
import Navbar from "../components/NavBar";
import {albumService} from "../service";

class AlbumComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: {},
            error: ""
        }
    }


    componentDidMount() {
        albumService.getById(this.props.match.params.id).then(
            album => {
                this.setState({album: album});
            }, error => {
                this.setState({error: error})
            }
        )
    }

    render() {
        const {error, album} = this.state;
        console.error(error);
        return (
            <div>
                <Navbar/>
                <main className={"mt-5 pt-4"}>

                    {error &&
                        <div className={"alert alert-danger"}> {error} </div>
                    }
                    {!error &&
                    <AlbumDetails album={album}/>
                    }
                </main>

            </div>
        )
    }
}

export {AlbumComponent}