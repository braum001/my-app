import React, { Component, Fragment } from 'react';
import './index.scss';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            formType: "login"
        };
    }
    switchForm = (val) => {
        this.setState({
            formType : val
        }) 
    }
    render() {
        return (
            <Fragment>
                <div className="form-wrap">
                    <div>
                        {this.state.formType === "login" ? <LoginForm switchForm={this.switchForm}></LoginForm> : <RegisterForm switchForm={this.switchForm}></RegisterForm>}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;