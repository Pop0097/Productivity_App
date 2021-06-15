import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header';
import TeamCard from '../../components/TeamCard';

import HttpServer from '../../utils/HttpServer';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userTeams: []
        }
    }

    async componentDidMount() {
        const userId = await HttpServer.getUserId();
        const userTeams = await HttpServer.getUsersTeams({ userId: userId });

        this.setState({
            userId: userId,
            userTeams: userTeams.result
        })
    }

    render() {
        return (
            <div>
                <Header />
                <p>Hello</p>

                {this.state.userTeams.map((id, i) => {
                    return (<TeamCard teamId={id} />)
                })}
            </div>
        );
    }
}

export default withRouter(Home);
