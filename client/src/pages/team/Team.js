import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HttpServer from '../../utils/HttpServer';
import TaskCard from '../../components/TaskCard';

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.state.userId,
            teamId: this.props.location.state.teamId,
            team: {},
            tasks: []
        }
    }

    async componentDidMount() {
        const team = await HttpServer.getTeamById({ teamId: this.props.location.state.teamId });
        const tasks = await HttpServer.getTeamTasksById({ teamId: this.props.location.state.teamId });

        this.setState({
            team: team.result,
            tasks: tasks.result
        })
    }

    createTaskPage = (event) => {
        event.preventDefault();

        this.props.history.push({
            pathname: "/create-task",
            state: {
                teamId: this.state.teamId,
                userId: this.state.userId
            }
        });
    }

    render() {
        return (
            <div>
                <p onClick={this.createTaskPage}> Create Task </p>
                <h1> {this.state.team.name} </h1>
                <p>{this.state.teamId} || {this.state.userId}</p>
                <h1>Todo:</h1>
                {this.state.tasks.map((task, i) => {
                    if (!task.completed) { // Only print tasks that are not completed
                        return (<div><TaskCard key={task._id} taskId={task._id} /><br /></div>)
                    }
                })}

                <br />

                <h1>Completed:</h1>
                {this.state.tasks.map((task, i) => {
                    if (task.completed) { // Only print tasks that are not completed
                        return (<div><TaskCard key={task._id} userId={this.state.userId} teamId={this.state.teamId} taskId={task._id} /><br /></div>)
                    }
                })}
            </div>
        );
    }
}

export default withRouter(Team);