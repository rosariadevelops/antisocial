import React from "react";
import axios from "./axios";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
//import FriendsList from "./FriendsList";
import Uploader from "./Uploader";
import OtherProfile from "./OtherProfile";
import { BrowserRouter, Route } from "react-router-dom";
//import { Link } from "react-router-dom";

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
            this.setState({
                ...data,
                profilePic: data.image_url || "/images/default.png",
            });
            console.log("APP DATA:", data);
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
        if (!this.state.id) {
            //return null;
            return <img src="/images/loading.gif" />;
        }
        return (
            <React.Fragment>
                <div className="nav">
                    <div className="logo">
                        anti<span>social</span>
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

                {/* <div className="container profile-container">
                    <Profile
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                        bio={state.bio}
                    />
                </div> */}

                <BrowserRouter>
                    <div className="container profile-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={state.id}
                                    firstname={state.firstname}
                                    lastname={state.lastname}
                                    imageURL={state.profilePic}
                                    bio={state.bio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {/* <div className="friends-container">
                    <FriendsList
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                    />
                </div> */}

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
