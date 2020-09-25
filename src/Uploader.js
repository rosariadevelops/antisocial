import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            imageURL: props.imageURL,
            clickHandler: props.clickHandler,
            uploadedFile: null,
        };
        console.log("this.state: ", this.state);
    }

    changeImg(img) {
        this.props.clickHandler(img);
    }

    handleChange(e) {
        const { name } = e.target;
        console.log("props URL: ", this.props.imageURL);
        this.setState(
            {
                // selectedFile: e.target.files[0],
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
            .post("/user/upload", formData)
            .then((response) => {
                console.log("/user/upload response: ", response);
                this.setState({
                    uploadedFile: response.data.image,
                });
            })
            .then(() => {
                this.changeImg(this.state.uploadedFile);
                console.log(this.state.uploadedFile);
            })
            .catch(function (err) {
                console.log("err in form POST /user/upload: ", err);
            });
    }

    render() {
        let state = this.state;
        return (
            <div className="modal-container">
                <div className="modal">
                    <a className="close-btn">
                        <span className="close-modal-left"></span>
                        <span className="close-modal-right"></span>
                    </a>
                    <h2>
                        Hey, {state.firstname} {state.lastname}
                    </h2>
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
                        <label htmlFor="file">
                            <span>↸</span> Edit
                        </label>
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
            </div>
        );
    }
}
