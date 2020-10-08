import React from "react";
import axios from "./axios";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
//import FriendsList from "./FriendsList";
import Uploader from "./Uploader";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Chat from "./Chat";
import { Link, BrowserRouter, Route } from "react-router-dom";
//import { Transition } from "react-transition-group";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            file: null,
        };
    }
    componentDidMount() {
        let bgImages = [
            "/images/background/gradient-1.jpg",
            "/images/background/gradient-2.jpg",
            "/images/background/gradient-3.jpg",
            "/images/background/gradient-4.jpg",
        ];
        let selectBG = bgImages[Math.floor(Math.random() * bgImages.length)];
        document.body.style.backgroundImage = `url(${selectBG})`;
        axios.get("/antiuser").then(({ data }) => {
            this.setState({
                ...data,
                profilePic: data.image_url || "/images/default-user.png",
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
                    <div className="main-ctr">
                        <div className="nav">
                            <div className="prof-pic">
                                <ProfilePic
                                    firstname={state.firstname}
                                    lastname={state.lastname}
                                    imageURL={state.profilePic}
                                    clickHandler={() =>
                                        this.setState({
                                            uploaderIsVisible: true,
                                        })
                                    }
                                />
                                <div className="search-link">
                                    <Link to="/">Profile</Link>
                                    <Link to="/friends">Connections</Link>
                                    <Link to="/antiusers">
                                        Search antisocialites
                                    </Link>
                                    <Link to="/anti">Go anti</Link>
                                    <Link to="/log-out">Log out</Link>
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
                            <Route path="/chat" component={Chat} />

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
