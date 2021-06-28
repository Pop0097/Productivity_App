import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';

import HttpServer from '../utils/HttpServer';
import UserQuickPreviewCard from '../components/UserQuickPreviewCard'

class UserSearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamId: props.teamId,
            usernameSearch: '',
            users: []
        }
    }

    displayResults = async (event) => {
        event.preventDefault()

        if (event.target.value === "") {
            this.setState({
                usernameSearch: '',
                users: []
            })
        } else {
            const users = await HttpServer.getUsersByUsername(event.target.value)

            var usersNotOnTeam = [];

            for (var i = 0; i < users.result.length; i++) {
                console.log(users.result[i].teams.includes(this.state.teamId), users.result[i].username, this.state.teamId)
                if (users.result[i].teams.includes(this.state.teamId) === false) {
                    usersNotOnTeam.push(users.result[i])
                }
            }

            this.setState({
                usernameSearch: event.target.value,
                users: usersNotOnTeam,
            })
        }
    }

    setSearchToBlank = () => {
        this.setState({
            usernameSearch: '',
            users: []
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Form className="task-form">
                        <Form.Group controlId="formUsernameSearch">
                            <Form.Control
                                type="text"
                                name="usernameSearch"
                                placeholder="Username"
                                onChange={this.displayResults}
                            />
                        </Form.Group>
                    </Form>
                </Container>
                <Container>
                    {this.state.users.map((user, i) => {
                        return (<div><UserQuickPreviewCard key={user._id} teamId={this.state.teamId} userId={user._id} blankSearchFunc={this.setSearchToBlank} inTeam={false} viewingInEditMode={true} /><br /></div>)
                    })}
                </Container>
            </div >
        );
    }
}

export default UserSearchBar;