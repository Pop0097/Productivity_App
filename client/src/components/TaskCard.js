import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
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
        alert(this.state.taskId)
    }

    render() {
        return (
            <div>
                <Container>
                    <Card onClick={this.showTask}>
                        <Card.Body>
                            <Card.Title>{this.state.task.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(TaskCard);
