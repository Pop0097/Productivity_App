import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HttpServer from '../../../utils/HttpServer';

import UserQuickPreviewCard from '../../../components/UserQuickPreviewCard';
import UserSearchBar from '../../../components/UserSearchBar';

class EditTeamMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.state.userId,
            teamId: this.props.location.state.teamId,
            team: {},
            members: []
        }
    }

    async componentDidMount() {
        const team = await HttpServer.getTeamById({ teamId: this.props.location.state.teamId });

        this.setState({
            team: team.result,
            members: team.result.members
        })
    }

    async componentDidUpdate() {
        const team = await HttpServer.getTeamById({ teamId: this.props.location.state.teamId });

        this.setState({
            team: team.result,
            members: team.result.members
        })
    }

    render() {
        return (
            <div>
                <h1>Team Members:</h1>
                {this.state.members.map((memberId, i) => {
                    return (<div><UserQuickPreviewCard key={memberId} userId={memberId} teamId={this.state.teamId} inTeam={true} viewingInEditMode={true} /><br /></div>)
                })}

                <br />

                <UserSearchBar teamId={this.state.teamId} />
            </div>
        );
    }
}

export default withRouter(EditTeamMembers);