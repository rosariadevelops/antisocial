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
                        profilePic: data.image_url,
                    });
                } else {
                    this.setState({
                        ...data,
                        profilePic: data.image_url,
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
                    <ProfilePic imageURL={state.profilePic} />
                </div>
                <div className="profile-details">
                    <h1>
                        {state.firstname} {state.lastname}
                    </h1>
                    <div>
                        <img
                            src={state.profilePic}
                            alt={`${state.firstname} ${state.lastname}`}
                        />
                    </div>
                    <p>{state.bio}</p>
                    <FriendButton otherUserId={state.id} />
                </div>
            </div>
        );
    }
}
