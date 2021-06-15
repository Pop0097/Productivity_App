import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CreateTask extends Component {
    constructor(props) {
        super(props)
    }

    handleCreateTask = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <p> Create task page </p>
            </div>
        );
    }
}

export default withRouter(CreateTask);