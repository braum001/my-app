import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login, GetCode } from "../../api/account";
// import { validata_email } from "../../utils/validata";

//获取验证码按钮样式
const getCodeStyle = { width: "100%" };

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            code_button_loading: false,
            code_button_disabled: false,
            code_button_text: "获取验证码"
        };
    }
    //登录
    onFinish = values => {
        Login().then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        })
        console.log('Received values of form: ', values);
    };

    //获取验证码
    getCode = () => {
        if (!this.state.username) {
            message.warning('请输入用户名', 1);
            return false;
        } else {
            setTimeout(() => {
                this.setState({
                    code_button_loading: true,
                    code_button_disabled: true,
                    code_button_text: "发送中"
                })
            }, 500)
        }
        const loginData = {
            username: this.state.username,
            module: "login"
        }
        GetCode(loginData).then(response => {
            console.log(response);
            this.countDown()
        }).catch(error => {
            console.log(error);
        })
    };
    inputChange = (e) => {
        let val = e.target.value;
        console.log(val);
        this.setState({
            username: val
        })
    }

    /** 倒计时 */
    countDown = () => {
        let timer = null;
        let sec = 60;
        setTimeout(() => {
            timer = setInterval(() => {
                sec--;
                this.setState({
                    code_button_text: `${sec}S`
                })
                if (sec === 0) {
                    this.setState({
                        code_button_disabled: false,
                        code_button_text: "重新获取"
                    })
                    clearInterval(timer);
                    return false;
                }
            }, 1000);
            this.setState({
                code_button_loading: false,
                code_button_disabled: true,
                code_button_text: `${sec}S`
            })
        }, 2000)
    }

    //注册
    toRegister = () => {
        this.props.switchForm('register')
    }
    render() {
        const { code_button_loading, code_button_text, code_button_disabled } = this.state;
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
                                { type: "email", message: "用户名必须为邮箱" }
                                // ({ getFieldValue }) => ({
                                //     validator(rule, value) {
                                //         if (validata_email(value)) {
                                //             that.setState({
                                //                 code_button_disabled: false
                                //             })
                                //             return Promise.resolve();
                                //         }else{
                                //             that.setState({
                                //                 code_button_disabled: true
                                //             })
                                //             return Promise.reject("用户名格式错误");
                                //         }
                                //     },
                                // }),
                            ]}
                        >
                            <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            <Row gutter={13}>
                                <Col className="gutter-row" span={15}>
                                    <Input placeholder="Code" />
                                </Col>
                                <Col className="gutter-row" span={9}>
                                    <Button style={getCodeStyle} loading={code_button_loading} disabled={code_button_disabled} type="primary" danger onClick={this.getCode}>{code_button_text}</Button>
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