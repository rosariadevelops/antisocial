import React from "react";
import axios from "./axios";

// expect to receive a prop that contain's the user's current bio text
// this needs to be set up like the App and Uploader file upload
// Write a function from App, that is wrapped in a function used in the onClick in App
// Pass this wrapper as a prop to Profile, then use it call the function inside Profile,
// The do the same wrapping and passing to BioEditor?
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log("BIO EDITOR PROPS: ", props);

        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            bioEditorIsVisible: false,
            bioStatic: true,
            bio: props.bio,
        };
        console.log("BIO EDITOR STATE: ", this.state);
    }

    addBio(e) {
        e.preventDefault();
        this.setState({
            bioEditorIsVisible: true,
            bioStatic: false,
        });
        console.log("bioEditorIsVisible: ", this.state.bioEditorIsVisible);
    }

    editBio(e) {
        e.preventDefault();
        this.setState({
            bioEditorIsVisible: true,
            bioStatic: false,
        });
        console.log("bioEditorIsVisible: ", this.state.bioEditorIsVisible);
    }

    changeBio(bio) {
        this.props.clickHandler(bio);
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({
            newBio: [value],
        });
    }

    saveBio(e) {
        e.preventDefault();
        let newBio = this.state.newBio;

        axios
            .post("/profile/edit-bio", newBio)
            .then((response) => {
                console.log("/profile/edit-bio response: ", response);
                this.setState({
                    bio: response.data.newBio,
                    bioEditorIsVisible: false,
                    bioStatic: true,
                });
                this.changeBio(this.state.bio);
                console.log("POST REQ STATE BIO: ", this.state.bio);
            })
            .catch(function (err) {
                console.log("err in form POST /profile/bio: ", err);
            });
    }

    render() {
        return (
            <div className="bio-editor">
                {this.state.bioStatic && (
                    <div>
                        <p className="bio-tag">
                            What would you like to present to the world?
                        </p>
                        {this.state.bio === null && (
                            <div className="addbio-ctr">
                                <p className="text">
                                    Looks like your bio is empty.
                                </p>
                                <button
                                    onClick={(e) => this.addBio(e)}
                                    className="addBio"
                                >
                                    Add one here
                                </button>
                            </div>
                        )}
                        {this.state.bio != null && (
                            <div className="bio-ctr">
                                <p className="text">{this.state.bio}</p>
                                <button
                                    onClick={(e) => this.editBio(e)}
                                    className="edit-bio-button"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {this.state.bioEditorIsVisible && (
                    <div className="editbio-ctr">
                        <p className="bio-tag">Self-proclaimed bio</p>
                        {this.state.bio === null && (
                            <textarea
                                onChange={(e) => this.handleChange(e)}
                                placeholder="Add your bio here"
                                cols="60"
                                rows="5"
                            ></textarea>
                        )}
                        {this.state.bio != null && (
                            <textarea
                                onChange={(e) => this.handleChange(e)}
                                placeholder={this.state.bio}
                                rows="5"
                            ></textarea>
                        )}

                        <button
                            onClick={(e) => this.saveBio(e)}
                            className="saveBio"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
