import React from "react";
// import axios from "./axios";
import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
import OnlineUsers from "./OnlineUsers";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.imageURL,
            firstname: props.firstname,
            lastname: props.lastname,
            bio: props.bio,
        };
        console.log("PROFILE DATA: ", this.state);
    }

    setBio(newBioText) {
        this.setState({
            newBio: newBioText,
        });
    }

    render() {
        let state = this.state;
        return (
            <div className="profile">
                <div className="profile-img-ctr">
                    <ProfilePic imageURL={state.profilePic} />
                </div>
                <div className="profile-content-ctr">
                    <h2>
                        {this.state.firstname} {this.state.lastname}
                    </h2>
                    <BioEditor
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                        bio={state.bio}
                        clickHandler={(e) => this.setBio(e)}
                    />
                </div>
                <div className="online-users-ctr">
                    <OnlineUsers imageURL={state.profilePic} />
                </div>
            </div>
        );
    }
}
