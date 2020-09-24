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

        // if error is false, render message
    }

    render() {
        return (
            <div className="modal-container">
                <div className="modal">
                    <a className="close-btn">
                        <span className="close-modal-left"></span>
                        <span className="close-modal-right"></span>
                    </a>
                    <h2>
                        Hey, {this.state.firstname} {this.state.lastname}
                    </h2>
                    <div className="profile-pic">
                        <img
                            src={this.state.imageURL}
                            alt={`${this.state.firstname} ${this.state.lastname}`}
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
                                this.state.clickHandler(this.state.selectedFile)
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
