import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import HttpServer from '../utils/HttpServer';

class TeamCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            teamId: props.teamId,
            team: {}
        }
    }

    async componentDidMount() {
        const team = await HttpServer.getTeamById({ teamId: this.state.teamId });

        this.setState({
            team: team.result
        })
    }

    showTeam = (event) => {
        event.preventDefault();

        this.props.history.push({
            pathname: '/team',
            state: {
                teamId: this.state.teamId,
                userId: this.state.userId
            }
        });
    }

    leaveTeam = (event) => {
        event.preventDefault()

        HttpServer.removeMemberFromTeam({ teamId: this.props.teamId, userId: this.props.userId })
    }

    render() {
        return (
            <div>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title onClick={this.showTeam}>{this.state.team.name}</Card.Title>
                            <Card.Text>
                                { // Admins should not leave team
                                    this.state.team.adminId != this.state.userId &&
                                    <p onClick={this.leaveTeam}>Leave Team</p>
                                }

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(TeamCard);
