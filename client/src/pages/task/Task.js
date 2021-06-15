import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HttpServer from '../../utils/HttpServer';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: this.props.location.state.taskId,
            task: {},
        }
    }

    async componentDidMount() {
        const task = await HttpServer.getTaskById({ taskId: this.state.taskId });

        this.setState({
            task: task.result
        })
    }

    render() {
        return (
            <div>
                <p> Task: {this.state.task.name} </p>
            </div>
        );
    }
}

export default withRouter(Task);