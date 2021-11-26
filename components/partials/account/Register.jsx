import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { register } from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';
import Title from '~/components/elements/Title';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ref = React.createRef();
    }

    onFinish = (values) => {
        this.props.dispatch(register(values));
        this.ref.current.resetFields();
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        ref={this.ref}
                        className="ps-form--account"
                        onFinish={this.onFinish}>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <a href="/">
                                    <img
                                        style={{ maxWidth: 120 }}
                                        src={'/static/img/logo-dark.png'}
                                        className="mb-5"
                                    />
                                </a>
                                <Title
                                    title="Create Account "
                                    subtitle="Create a Due Dilly Account"
                                />
                                <div style={{ paddingTop: 30 }}>
                                    <div className="form-group dark">
                                        <Form.Item
                                            name="fullName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your Full Name!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="string"
                                                placeholder="Full Name"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group dark">
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your email!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="email"
                                                placeholder="Email address"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group dark form-forgot">
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your password!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="password"
                                                placeholder="Password..."
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                                <div>
                                    <p
                                        className="text-center"
                                        style={{ marginRight: 5 }}>
                                        Already have an account?{' '}
                                        <span>
                                            <a href="/account/login">Sign In</a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {/* <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);
