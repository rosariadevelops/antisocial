import React from "react";
import axios from "axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("/user result:", data);
            this.setState({
                ...data,
                profileImage: data.image || "/images/default.png",
            });
        });
    }

    render() {
        if (!this.state.id) {
            //return null;
            return <img src="public/images/loading.gif" />;
        }
        return (
            <React.Fragment>
                <div className="nav">
                    <div className="logo">
                        Anti<span>Social</span>
                    </div>
                    <div className="prof-pic">
                        <ProfilePic
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            imageURL={this.state.profileImage}
                            clickHandler={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.state.image} />
                )}
            </React.Fragment>
        );
    }
}
