import React, { Component } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import HttpServer from '../../../utils/HttpServer';
import './Registration.css';

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            usernameAvailable: true,
        };
    }

    handleRegistration = async (event) => {
        event.preventDefault();

        if (!this.state.usernameAvailable) {
            alert('Unable to reister. Your username is not unique.');
            return;
        }

        const response = await HttpServer.register({
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email
        });

        if (response.error) {
            alert('Unable to reister. Please try again after some time.');
        } else {
            this.state = {
                username: '',
                password: '',
                name: '',
                email: '',
                usernameAvailable: true,
            };

            HttpServer.setLocalStorage('userid', response.userId);
            this.props.history.push('/home');
        }
    }

    checkUsernameAvailability = async (event) => {

        console.log(event.target.value + " " + this.state.usernameAvailable);

        if ('' !== event.target.value && undefined !== event.target.value) {
            this.setState({
                username: event.target.value
            });

            const res = await HttpServer.checkUsernameAvailability(this.state.username);

            console.log("Hello", res);

            if (res.error) {
                this.setState({
                    usernameAvailable: false,
                });
            } else {
                this.setState({
                    usernameAvailable: true,
                });
            }
        } else if ('' === event.target.value) {
            this.setState({
                usernameAvailable: true,
            });
        }

        console.log(this.state.usernameAvailable);
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <Form className="auth-form">
                    <Form.Group controlId="formName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                        <DebounceInput
                            className="form-control"
                            placeholder="Enter username"
                            minLength={2}
                            debounceTimeout={300}
                            onChange={this.checkUsernameAvailability}
                        />

                        <Alert className={{
                            'username-availability-warning': true,
                            'visibility-hidden': this.state.usernameAvailable
                        }} variant="danger">
                            <strong>{this.state.username}</strong> is already taken, try another username.
                        </Alert>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleRegistration}>
                        Register
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Registration);