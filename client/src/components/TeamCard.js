import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import HttpServer from '../utils/HttpServer';

class TeamCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: props.teamId,
            team: {}
        }
    }

    async componentDidMount() {
        const team = await HttpServer.getTeamById({ teamId: this.state.teamId });

        this.setState({
            team: team.result
        })

        console.log(this.state.team)
    }

    showTeam = (event) => {
        event.preventDefault();
        alert(this.state.teamId);
    }

    render() {
        return (
            <div>
                <Container>
                    <Card onClick={this.showTeam}>
                        <Card.Body>
                            <Card.Title>{this.state.team.name}</Card.Title>
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

export default withRouter(TeamCard);
