import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import HttpServer from '../../../utils/HttpServer';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = async (event) => {
        event.preventDefault();

        try {
            const res = await HttpServer.login(this.state);

            if (res.error) {
                alert('Invalid login credentials');
            } else {
                HttpServer.setLocalStorage('userid', res.userId);
                this.props.history.push('/home');
            }
        } catch (err) {
            alert('Invalid login credentials');
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Form className="auth-form">
                    <Form.Group controlId="loginUsername">
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={
                                this.handleInputChange
                            }
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={
                                this.handleInputChange
                            }
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleLogin}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);