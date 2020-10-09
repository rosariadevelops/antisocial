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
            dark: false,
            light: true,
            themeText: "Go anti",
        };
    }
    componentDidMount() {
        console.log("theme mode: ", this.state);
        // light theme backgrounds
        if (this.state.light) {
            let bgImages = [
                "/images/background/gradient-1.jpg",
                "/images/background/gradient-2.jpg",
                "/images/background/gradient-3.jpg",
                "/images/background/gradient-4.jpg",
            ];
            let selectBG =
                bgImages[Math.floor(Math.random() * bgImages.length)];
            document.body.style.backgroundImage = `url(${selectBG})`;
        }

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

    goDark(e) {
        e.preventDefault();
        document.body.classList.add("dark");
        this.setState({
            dark: true,
            light: false,
            themeText: "Go social",
        });
        let bgImagesDark = [
            "/images/background/dark-bg-1.jpg",
            "/images/background/dark-bg-2.jpg",
            "/images/background/dark-bg-3.jpg",
            "/images/background/dark-bg-4.jpg",
        ];
        let selectBGDark =
            bgImagesDark[Math.floor(Math.random() * bgImagesDark.length)];
        document.body.style.backgroundImage = `url(${selectBGDark})`;
    }

    goLight(e) {
        e.preventDefault();
        document.body.classList.remove("dark");
        this.setState({
            dark: false,
            light: true,
            themeText: "Go anti",
        });
        let bgImages = [
            "/images/background/gradient-1.jpg",
            "/images/background/gradient-2.jpg",
            "/images/background/gradient-3.jpg",
            "/images/background/gradient-4.jpg",
        ];
        let selectBG = bgImages[Math.floor(Math.random() * bgImages.length)];
        document.body.style.backgroundImage = `url(${selectBG})`;
        // console.log("light mode: ", this.state);
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
                            </div>
                            <div className="search-link">
                                <Link to="/">Profile</Link>
                                <Link to="/friends">
                                    Connections
                                    {state.friendRequests && (
                                        <span>{state.friendRequests}</span>
                                    )}
                                </Link>
                                <Link to="/antiusers">
                                    Search antisocialites
                                </Link>
                                <Link to="/chat">Socialise</Link>
                                <div className="negatives">
                                    {state.light && (
                                        <button onClick={(e) => this.goDark(e)}>
                                            {state.themeText}
                                        </button>
                                    )}
                                    {state.dark && (
                                        <button
                                            onClick={(e) => this.goLight(e)}
                                        >
                                            {state.themeText}
                                        </button>
                                    )}
                                    <a href="/logout">Logout</a>
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

                            <div className="search-container">
                                <Route
                                    path="/antiusers"
                                    render={() => <FindPeople id={state.id} />}
                                />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>

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
