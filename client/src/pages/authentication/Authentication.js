import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import './Authentication.css';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false
        };
    }

    setRenderLoadingState = (loading) => {
        this.setState({
            loadingState: loading
        });
    }

    render() {
        return (
            <div className="container">
                <div className="authentication-screen">
                    <Tabs variant="pills" defaultActiveKey="login">
                        <Tab eventKey="login" title="Sign In">
                            {/* <Login loadingState={this.setRenderLoadingState} /> */}
                        </Tab>
                        <Tab eventKey="registration" title="Sign Up">
                            {/* <Login loadingState={this.setRenderLoadingState} /> */}
                        </Tab>
                    </Tabs>
                </div>

                <div className={`overlay auth-loading ${this.state.loadingState ? '' : 'visibility-hidden'}`}>
                    <h1> Loading </h1>
                </div>

            </div>
        );
    }
}

// WithRouter allows us to use history when we route to the next page
export default withRouter(Authentication);