import React from "react";
import axios from "axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            imageURL: props.imageURL,
            clickHandler: props.clickHandler,
            selectedFile: null,
        };
        console.log("this.state: ", this.state);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState(
            {
                [name]: value,
                selectedFile: e.target.files[0],
            },
            () => console.log("handleChange: ", this.state)
        );
    }

    fileUpload(file) {
        const formData = new FormData();
        formData.append("file", file);
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
                        <img
                            src={state.imageURL}
                            alt={`${state.firstname} ${state.lastname}`}
                        />
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
                            onClick={() =>
                                state.clickHandler(
                                    this.fileUpload(state.selectedFile)
                                )
                            }
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
