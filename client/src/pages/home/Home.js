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
                <h1> Your Teams </h1>

                <br />

                {this.state.userTeams.map((id, i) => {
                    return (<div><TeamCard key={id} teamId={id} /><br /></div>)
                })}
            </div>
        );
    }
}

export default withRouter(Home);
