import React from "react";
// import axios from "./axios";
import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.imageURL,
            firstname: props.firstname,
            lastname: props.lastname,
        };
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
                    <ProfilePic
                        imageURL={state.profilePic}
                        /*                         clickHandler={() =>
                            this.setState({ uploaderIsVisible: true })
                        } */
                    />
                </div>
                <div className="bio-ctr">
                    <BioEditor
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                        clickHandler={(e) => this.setBio(e)}
                    />
                </div>
            </div>
        );
    }
}
