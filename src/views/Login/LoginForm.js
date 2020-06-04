import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from "../../api/account"
class LoginForm extends Component {
    constructor() {
        super();
        this.state = {};
    }
    onFinish = values => {
        Login().then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        })
        console.log('Received values of form: ', values);
    };
    toRegister = () => {
        this.props.switchForm('register')
    }
    render() {
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toRegister}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空' },
                                { type: "email", message: "用户名格式为邮箱" }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '密码不能为空' },
                                { min: 6, message: '密码长度不能小于6位' },
                                { max: 20, message: '密码长度不能大于20位' },
                                { whitespace: true, message: '请勿输入空格' }
                            ]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '验证码不能为空' },
                            { len: 6, message: '请输入长度为6的验证码' }
                            ]}
                        >
                            <Row gutter={16}>
                                <Col className="gutter-row" span={15}>
                                    <Input placeholder="Code" />
                                </Col>
                                <Col className="gutter-row" span={9}>
                                    <Button type="primary" danger>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default LoginForm;