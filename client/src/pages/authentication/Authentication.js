import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import './Authentication.css';

import Login from './login/Login';
import Registration from './registration/Registration';

class Authentication extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="authentication-screen">
                    <Tabs variant="pills" defaultActiveKey="login">
                        <Tab eventKey="login" title="Sign In">
                            <Login />
                        </Tab>
                        <Tab eventKey="registration" title="Sign Up">
                            <Registration />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

// WithRouter allows us to use history when we route to the next page
export default withRouter(Authentication);