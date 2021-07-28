import React from 'react';
import { Input, Form, Row, Button } from 'antd';
import AvatarUpload from './upload/AvatharUpload';
import { updateUserName } from '~/store/userInfo/action';
import { useDispatch } from 'react-redux';

const FormChangeUserInformation = (props) => {
    const dispatch = useDispatch();
    const formRef = React.useRef();
    const { userInfo } = props;
    React.useEffect(() => {
        if (userInfo && formRef.current)
            formRef.current.setFieldsValue({
                ...userInfo,
            });
    }, [userInfo]);

    const onUserNameSave = () => {
        const username = formRef.current.getFieldValue('username');
        dispatch(updateUserName(username));
    };

    return (
        <Form
            ref={formRef}
            className="ps-form--account-setting"
            layout="vertical">
            <div className="ps-form__header">
                <h3>My Profile</h3>
            </div>
            <div className="ps-form__content">
                <Row align="middle" justify="center">
                    <AvatarUpload
                        userInfo={userInfo}
                        profilePhoto={userInfo?.profilePicture || null}
                    />
                </Row>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group dark">
                            <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your title',
                                    },
                                ]}>
                                <Input
                                    disabled
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Full name..."
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group dark">
                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your User name',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter User Name..."
                                    suffix={
                                        <Button
                                            onClick={onUserNameSave}
                                            type="primary"
                                            icon={
                                                <i class="fa fa-check"></i>
                                            }></Button>
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group dark">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                ]}>
                                <Input
                                    disabled
                                    className="form-control"
                                    type="email"
                                    placeholder="Enter Email..."
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="ps-form__submit text-center">
                    {/* <button className="ps-btn ps-btn--gray mr-3">Cancel</button> */}
                    {/* <button className="ps-btn success">Update Profile</button> */}
                </div>
            </div>
        </Form>
    );
};

export default FormChangeUserInformation;

/*

<div className="form-group">
                    <Form.Item
                        label="User Name"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your User name',
                            },
                        ]}>
                        <Input disabled className="form-control" type="text" />
                    </Form.Item>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group submit">
                    <button className="ps-btn">Update profile</button>
                </div>
*/
