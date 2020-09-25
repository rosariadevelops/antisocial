import React from "react";
import axios from "./axios";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            file: null,
        };
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("/user result:", data);
            this.setState({
                ...data,
                profilePic: data.image_url || "/images/default.png",
            });
        });
    }

    closeModal() {
        this.setState({ uploaderIsVisible: false });
    }

    setImage(image) {
        this.setState({
            profilePic: image,
            uploaderIsVisible: false,
        });
    }

    render() {
        let state = this.state;
        console.log("render state", state);
        if (!this.state.id) {
            //return null;
            return <img src="/images/loading.gif" />;
        }
        return (
            <React.Fragment>
                {state.error}
                <div className="nav">
                    <div className="logo">
                        Anti<span>Social</span>
                    </div>
                    <div className="prof-pic">
                        <ProfilePic
                            imageURL={state.profilePic}
                            clickHandler={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                </div>

                <div className="profile-container">
                    <Profile
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                    />
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                        clickHandler={(image) => this.setImage(image)}
                        close={(e) => this.closeModal(e)}
                    />
                )}
            </React.Fragment>
        );
    }
}
