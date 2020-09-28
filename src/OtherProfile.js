import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.imageURL,
            firstname: props.firstname,
            lastname: props.lastname,
            bio: props.bio,
            //key: props.key,
            //match: props.match,
            //history: props.history,
        };
        console.log("OTHER PROFILE DATA: ", this.state);
    }

    componentDidMount() {
        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                console.log("OTHER PROFILE DATA:", data);
                this.setState({
                    ...data,
                    profilePic: data.image_url || "/images/default.png",
                });
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
                </div>
                {/* <Profile
                    id={this.state.id}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    imageURL={this.state.profilePic}
                    bio={this.state.bio}
                /> */}
            </div>
        );
    }
}
