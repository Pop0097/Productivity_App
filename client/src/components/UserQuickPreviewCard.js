import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';

import HttpServer from '../utils/HttpServer';

class UserQuickPreviewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            teamId: props.teamId,
            inEditMode: props.viewingInEditMode,
            inTeam: props.inTeam,
            user: {}
        }
    }

    async componentDidMount() {
        const user = await HttpServer.getUserById({ userId: this.props.userId });

        this.setState({
            user: user.result
        })
    }

    removeMemberFromTeam = async (event) => {
        event.preventDefault();

        await HttpServer.removeMemberFromTeam({ teamId: this.props.teamId, userId: this.state.userId })

        this.setState({
            inTeam: false,
        })
    }

    addUserToTeam = async (event) => {
        event.preventDefault();

        await HttpServer.addMemberToTeam({ teamId: this.props.teamId, userId: this.state.userId })

        this.setState({
            inTeam: true,
        })

        this.props.blankSearchFunc();
    }

    render() {
        return (
            <div>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.state.user.username}: {this.state.user.name}</Card.Title>
                            <Card.Text>
                                <p><b>Email:</b> {this.state.user.email}</p>
                            </Card.Text>

                            {this.state.inEditMode && this.state.inTeam &&
                                <p onClick={this.removeMemberFromTeam}>Remove from team</p>
                            }

                            {this.state.inEditMode && !this.state.inTeam &&
                                <p onClick={this.addUserToTeam}>Add to team</p>
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div >
        );
    }
}

export default UserQuickPreviewCard;