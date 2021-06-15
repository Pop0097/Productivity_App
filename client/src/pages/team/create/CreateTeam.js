import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import HttpServer from '../../../utils/HttpServer';

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            organization: '',
            adminId: '',
            members: []
        };
    }

    async componentDidMount() {
        const userId = await HttpServer.getUserId()

        this.setState({
            adminId: userId,
        })
    }

    createTask = async (event) => {
        event.preventDefault();

        const response = await HttpServer.createTeam({
            name: this.state.name,
            organization: this.state.organization,
            adminId: this.state.adminId,
            members: this.state.members,
        })

        if (response.error) {
            alert('Unable to create team. Please try again after some time.');
        } else {

            const addMemberResponse = await HttpServer.addMemberToTeam({
                teamId: response.teamId,
                userId: this.state.adminId
            })

            console.log(addMemberResponse)

            if (addMemberResponse.error) {
                alert('Unable to add admin to the team. Please try again after some time.');
            }
        }

        this.props.history.push('/home')
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Form className="task-form">
                        <Form.Group controlId="formName">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Team Name"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrganization">
                            <Form.Control
                                type="text"
                                name="organization"
                                placeholder="Team Organization"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.createTask}>
                            Create Task
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default withRouter(CreateTeam);