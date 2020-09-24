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
                profileImage: data.image || "/images/default.png",
                uploadedFile: null,
            });
        });
    }

    setImage(file) {
        file.preventDefault();
        console.log("setImage filename: ", file);

        this.setState({
            uploadedFile: file,
        });

        const formData = new FormData();
        formData.append(
            "file",
            this.state.uploadedFile,
            this.state.uploadedFile.name
        );

        axios
            .post("user/upload", formData)
            .then((response) => {
                console.log("/user/upload response: ", response);
            })
            .catch(function (err) {
                console.log("err in form POST /user/upload: ", err);
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
                            imageURL={state.profileImage}
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
                        imageURL={state.profileImage}
                        clickHandler={(e) => state.setImage(e)}
                    />
                )}
            </React.Fragment>
        );
    }
}
