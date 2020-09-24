import React from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) =>
            this.setState({
                ...data,
                image: data.image || "./images/default.jpg",
            })
        );
    }

    render() {
        if (!this.state.id) {
            //return null;
            return <img src="./images/loading.gif" />;
        }
        return (
            <React.Fragment>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageURL={this.state.imageURL}
                    clickHandler={() =>
                        this.setState({ uploaderIsVisible: true })
                    }
                />

                {this.state.uploaderIsVisible && <Uploader setImage={image} />}
            </React.Fragment>
        );
    }
}
