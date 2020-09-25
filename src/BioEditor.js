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
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            bioEditorIsVisible: false,
        };
    }

    changeBio(bio) {
        this.props.clickHandler(bio);
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState(
            {
                newBio: [value],
            },
            () => console.log("Edit Bio Text: ", this.state)
        );
    }

    saveBio(e) {
        e.preventDefault();
        //let formData = new FormData();
        //formData.append("file", this.state.file);
        //console.log("file: ", this.state.file);

        // click save and send the value to the state
        let newBio = this.state.newBio;

        axios
            .post("/profile/edit-bio", newBio)
            .then((response) => {
                console.log("/user/upload response: ", response);
                /* this.setState({
                    uploadedFile: response.data.image,
                }); */
                this.changeBio(newBio);
            })
            .catch(function (err) {
                console.log("err in form POST /user/upload: ", err);
            });
    }

    render() {
        let state = this.state;
        return (
            <div className="bio-editor">
                <h2>
                    Hey, {state.firstname} {state.lastname}
                </h2>
                <div className="bio">
                    {/*  This is where I want conditional rendering  */}
                    {/*  state.bio === null  &&  */}
                    <div className="addbio-link">
                        Looks like your bio is empty.{" "}
                        <button
                            // onClick={(e) => this.fileUpload(e)}
                            className="addBio"
                        >
                            Add one here
                        </button>
                        {/*  state.bio !== null  &&  */}
                        {/* <div className="bio-text">
                            <p>{state.bio}</p>
                            <button
                                // onClick={(e) => this.editBio(e)}
                                className="editBio"
                            >
                                Edit
                            </button>
                        </div> */}
                        {/*  state.bioEditorIsVisible === true  &&  */}
                        {/* <div className="editbio">
                            <textarea 
                                onChange={(e) => this.handleChange(e)} 
                                value={state.bio}></textarea>
                            <button
                                // onClick={(e) => this.saveBio(e)}
                                className="saveBio"
                            >
                                Save
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
