import React from "react";
import axios from "axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("/user result:", data);
            this.setState({
                ...data,
                profilePic: data.image || "/images/default.png",
                uploadedFile: null,
            });
        });
    }

    setImage(e) {
        e.preventDefault();
        this.fileUpload(this.state.uploadedFile).then((response) => {
            console.log("fileUpload data: ", response.data);
        });
    }

    render() {
        let state = this.state;
        console.log("state", state);
        if (!this.state.id) {
            //return null;
            return <img src="/images/loading.gif" />;
        }
        return (
            <React.Fragment>
                {state.error}
                <div className="nav">
                    <div className="logo">
                        Anti<span>Social</span>
                    </div>
                    <div className="prof-pic">
                        <ProfilePic
                            firstname={state.firstname}
                            lastname={state.lastname}
                            imageURL={state.profilePic}
                            clickHandler={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        firstname={state.firstname}
                        lastname={state.lastname}
                        imageURL={state.profilePic}
                        clickHandler={(e) =>
                            this.props.setImage(this.fileUpload(e))
                        }
                    />
                )}
            </React.Fragment>
        );
    }
}
