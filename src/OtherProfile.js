import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import FriendButton from "./FriendButton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.imageURL,
            firstname: props.firstname,
            lastname: props.lastname,
            bio: props.bio,
        };
    }

    componentDidMount() {
        axios
            .get(`/antiuser/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                    console.log("You can't view your own profile");
                    this.setState({
                        ...data,
                        profilePic: data.image_url || "/images/default.png",
                    });
                } else {
                    this.setState({
                        ...data,
                        profilePic: data.image_url || "/images/default.png",
                    });
                    console.log("OTHER USER DATA: ", this.state);
                }
            });
    }

    render() {
        let state = this.state;
        return (
            <div className="profile">
                <div className="profile-img-ctr">
                    <ProfilePic
                        imageURL={state.profilePic}
                        firstname={state.firstname}
                        lastname={state.lastname}
                    />
                </div>
                <div className="profile-content-ctr">
                    <h2>
                        {state.firstname} {state.lastname}
                    </h2>
                    <div className="bio-editor">
                        <p>
                            {state.bio ||
                                "This user prefers to keep themselves private."}
                        </p>
                    </div>
                    <FriendButton otherUserId={state.id} />
                </div>
            </div>
        );
    }
}
