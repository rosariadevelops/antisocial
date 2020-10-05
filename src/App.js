import React from "react";
import axios from "./axios";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
//import FriendsList from "./FriendsList";
import Uploader from "./Uploader";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import { Link, BrowserRouter, Route } from "react-router-dom";

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            file: null,
        };
    }
    componentDidMount() {
        axios.get("/antiuser").then(({ data }) => {
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
            return null;
        }
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="nav">
                        <div className="prof-pic">
                            <ProfilePic
                                firstname={state.firstname}
                                lastname={state.lastname}
                                imageURL={state.profilePic}
                                clickHandler={() =>
                                    this.setState({ uploaderIsVisible: true })
                                }
                            />
                            <div className="search-link">
                                <Link to="/">Profile</Link>
                                <Link to="/friends">Friends</Link>
                                <Link to="/antiusers">Search</Link>
                            </div>
                        </div>
                        <div className="logo">
                            anti<span>social</span>
                        </div>
                    </div>

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
                            path="/antiuser/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    imageURL={state.profilePic}
                                    id={state.id}
                                    firstname={state.firstname}
                                    lastname={state.lastname}
                                />
                            )}
                        />

                        <div className="search-container">
                            <Route
                                path="/antiusers"
                                render={() => <FindPeople id={state.id} />}
                            />
                            <Route
                                path="/friends"
                                render={(props) => (
                                    <Friends
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        imageURL={state.profilePic}
                                        id={state.id}
                                        firstname={state.firstname}
                                        lastname={state.lastname}
                                    />
                                )}
                            />
                        </div>
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
