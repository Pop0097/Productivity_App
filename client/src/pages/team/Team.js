import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HttpServer from '../../utils/HttpServer';
import TaskCard from '../../components/TaskCard';

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: this.props.location.state.teamId,
            team: {},
            tasks: []
        }
    }

    async componentDidMount() {
        const team = await HttpServer.getTeamById({ teamId: this.state.teamId });
        const tasks = await HttpServer.getTeamTasksById({ teamId: this.state.teamId });

        this.setState({
            team: team.result,
            tasks: tasks.result
        })
    }

    render() {
        return (
            <div>
                <p> Team: {this.state.team.name} </p>
                {this.state.tasks.map((task, i) => {
                    return (<TaskCard taskId={task._id} />)
                })}
            </div>
        );
    }
}

export default withRouter(Team);