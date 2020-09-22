import React from "react";
//import axios from "axios";

export default class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cohort: "cumin",
            name: "rosaria",
        };
    }

    componentDidMount() {
        this.setState({
            cohort: "zimt",
            lastName: "gandar",
        });
    }

    handleClick() {
        //console.log("this props: ", this.props);
        // this is server-side code:
        /* axios.post("/random").then((resp) => {
            console.log(resp);
        }); */
        this.setState({
            cohort: "cumin is awesome",
        });
    }

    render() {
        console.log("this.props: ", this.props);
        return (
            <div>
                <p onClick={() => this.handleClick()}>
                    Welcome to React, {this.state.cohort}
                </p>
                {this.state.lastName && (
                    <p>
                        Hope you like it {this.state.name} {this.state.lastName}{" "}
                        <br />
                        From {this.props.animal}.
                    </p>
                )}
            </div>
        );
    }
}
