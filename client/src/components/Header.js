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

    render() {
        return (
            <div>
                <p onClick={this.handleLogOut}>Logout</p>
            </div>
        );
    }
}

export default withRouter(Header);