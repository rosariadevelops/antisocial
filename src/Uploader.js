import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            imageURL: props.imageURL,
            uploadedFile: null,
        };
        console.log("this.state: ", this.state);
        document.body.classList.add("blur-me");
    }

    changeImg(img) {
        this.props.clickHandler(img);
    }

    closeModal(e) {
        this.props.close(e);
        document.body.classList.remove("blur-me");
    }

    handleChange(e) {
        const { name } = e.target;
        console.log("props URL: ", this.props.imageURL);
        this.setState(
            {
                [name]: e.target.files[0],
            },
            () => console.log("File Upload: ", this.state.file)
        );
    }

    fileUpload(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", this.state.file);
        console.log("file: ", this.state.file);

        axios
            .post("/antiuser/upload", formData)
            .then((response) => {
                console.log("/user/upload response: ", response);
                this.setState({
                    uploadedFile: response.data.image,
                });
            })
            .then(() => {
                this.changeImg(this.state.uploadedFile);
                console.log("state.uploadedFile: ", this.state.uploadedFile);
            })
            .catch(function (err) {
                console.log("err in form POST /user/upload: ", err);
            });
    }

    render() {
        let state = this.state;
        return (
            <div className="modal-container">
                <div className="overlay"></div>
                <div className="modal">
                    <a
                        className="close-btn"
                        onClick={(e) => this.closeModal(e)}
                    >
                        <span className="close-modal-left"></span>
                        <span className="close-modal-right"></span>
                    </a>

                    <div className="profile-goods">
                        <div className="profile-pic">
                            {this.state.uploadedFile === null && (
                                <img
                                    src={state.imageURL}
                                    alt={`${state.firstname} ${state.lastname}`}
                                />
                            )}
                            {this.state.uploadedFile !== null && (
                                <img
                                    src={state.uploadedFile}
                                    alt={`${state.firstname} ${state.lastname}`}
                                />
                            )}
                        </div>

                        <div className="change-pic">
                            <label htmlFor="file">Choose new file</label>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="file"
                                name="file"
                                id="file"
                                accept="image/*"
                            />
                            <button
                                onClick={(e) => this.fileUpload(e)}
                                className="upload"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <p>
                        Your profile picture shows up in your profile and the
                        community chat.
                    </p>
                </div>
            </div>
        );
    }
}
