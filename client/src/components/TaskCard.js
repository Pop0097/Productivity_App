import React, { Component } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import HttpServer from '../utils/HttpServer';

class TaskCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: props.taskId,
            task: {}
        }
    }

    async componentDidMount() {
        const task = await HttpServer.getTaskById({ taskId: this.state.taskId });

        this.setState({
            task: task.result
        })
    }

    showTask = (event) => {
        event.preventDefault();

        this.props.history.push({
            pathname: '/task',
            state: {
                taskId: this.state.taskId
            }
        });
    }

    markComplete = async (event) => {
        event.preventDefault()

        await HttpServer.completeTask({ _id: this.state.taskId })
    }

    markIncomplete = async (event) => {
        event.preventDefault()

        await HttpServer.reopenTask({ _id: this.state.taskId })
    }

    render() {
        return (
            <div>
                <Container>
                    <Card onClick={this.showTask}>
                        <Card.Body>
                            <Card.Title>{this.state.task.name}</Card.Title>
                            <Card.Text>
                                <p>Some quick example text to build on the card title and make up the bulk of
                                    the card's content. </p>

                                <br />

                                {
                                    this.state.task.completed ? (
                                        <p onClick={this.markIncomplete}>Mark Incomplete</p>
                                    ) : (
                                        <p onClick={this.markComplete}>Mark Complete</p>
                                    )
                                }

                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(TaskCard);
