import React from "react";
import axios from "./axios";
// import ProfilePic from "./ProfilePic";
//import Profile from "./Profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.imageURL,
            firstname: props.firstname,
            lastname: props.lastname,
        };
        // console.log("FRIENDS LIST DATA: ", this.state);
    }

    componentDidMount() {
        axios.get(`/friends`).then(({ data }) => {
            // console.log("FRIENDS LIST DATA: ", data);

            if (data.redirect) {
                this.props.history.push("/");
                console.log("You can't view your own profile");
                this.setState({
                    ...data,
                    profilePic: data.image_url /*  || "/images/default.png" */,
                });
            } else {
                let friendsList = data;
                console.log("FRIENDS LIST DATA: ", friendsList);

                Object.keys(friendsList).forEach(function (key) {
                    console.log(key, friendsList[key]);
                    const { id, firstname, lastname, image_url } = friendsList[
                        key
                    ];
                });
                this.setState({
                    id,
                    firstname,
                    lastname,
                    image_url,
                });
            }
        });
    }

    render() {
        let state = this.state;
        return (
            <div className="friends-list">
                <div className="friend-ctr">
                    <div className="profile-img-ctr">
                        <img
                            src={state.profilePic}
                            alt={`${state.firstname} ${state.lastname}`}
                        />
                    </div>
                </div>
                <div className="name">
                    <h4>
                        {state.firstname} {state.lastname}
                    </h4>
                </div>
            </div>
        );
    }
}
