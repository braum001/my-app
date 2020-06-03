import React, {Component, Fragment } from 'react';
import './Home.scss';
import { Button } from 'antd';

class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Fragment>
                <div>Home</div>
                <Button type="primary">Primary Button</Button>
            </Fragment>
        )
    }
}

export default Home;