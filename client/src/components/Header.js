import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HttpServer from '../utils/HttpServer';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: ''
        }
    }

    async componentDidMount() {
        const userId = await HttpServer.getUserId();
        this.setState({
            userId: userId
        })
    }

    handleLogOut = async (event) => {
        event.preventDefault();

        try {
            await HttpServer.removeLocalStorage();
            await HttpServer.logout({ userId: this.state.userId });

            this.props.history.push('/');
        } catch (err) {
            console.log(err);
            alert('Error logging out.');
            throw err;
        }
    }

    createTeam = async (event) => {
        event.preventDefault()

        alert('wip')

        this.props.history.push('/home');
    }

    render() {
        return (
            <div>
                <p onClick={this.handleLogOut}>Logout</p>
                <p onClick={this.createTeam}>Create Team</p>
            </div>
        );
    }
}

export default withRouter(Header);