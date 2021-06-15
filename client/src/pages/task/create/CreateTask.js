import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import HttpServer from '../../../utils/HttpServer';

class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            _id: this.props.location.state.teamId,
            subteam: 'placeholder',
            creator: this.props.location.state.userId,
            assignees: [this.props.location.state.userId],
            comments: '',
            priority: 1,
            completed: false
        };
    }

    createTask = async (event) => {
        event.preventDefault();

        const response = await HttpServer.createTask({
            name: this.state.name,
            _id: this.state._id,
            subteam: this.state.subteam,
            creator: this.state.creator,
            assignees: this.state.assignees,
            comments: this.state.comments,
            priority: this.state.priority,
            completed: this.state.completed
        })

        if (response.error) {
            alert('Unable to create task. Please try again after some time.');
        } else {
            this.props.history.push({
                pathname: '/team',
                state: {
                    teamId: this.state._id,
                    userId: this.state.creator
                }
            });
        }
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
                                placeholder="Task Name"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formComments">
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="comments"
                                placeholder="Comments"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrioirty">
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
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

export default withRouter(CreateTask);
