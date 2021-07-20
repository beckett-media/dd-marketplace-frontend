import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
    Form,
    Input,
    Checkbox,
    Radio,
    Popconfirm,
    Typography,
    Space,
    Card,
} from 'antd';
import { connect } from 'react-redux';
import {
    getSavedAddressRequest,
    saveAddressRequest,
    setAddressDeleteRequest,
    setDefaultAddressRequest,
} from '~/store/checkout/action';
import { getSavedAddress } from '~/store/checkout/selectors';

class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.dispatch(getSavedAddressRequest());
    }

    handleLoginSubmit = (values) => {
        const isEdit = Boolean(values._id);
        const { address } = this.props;
        const isAddressAvailable = Boolean(address && address.length);
        if (!isAddressAvailable) values.isDefaultAddress = true;
        this.props.dispatch(saveAddressRequest(values, isEdit));
        this.formRef.current.resetFields();
    };

    onDefaultAddressChange = (address) => {
        this.props.dispatch(setDefaultAddressRequest(address._id));
    };

    onAddressEdit = (address) => {
        this.setState({ edit: true });
        this.formRef.current.setFieldsValue({
            ...address,
        });
    };

    onNextButtonClick = (event) => {
        event.preventDefault();
        Router.push('/account/payment');
    };

    deleteConfirm(addressId) {
        this.props.dispatch(setAddressDeleteRequest(addressId));
    }

    render() {
        const { address } = this.props;

        const isAddressAvailable = Boolean(address && address.length);

        return (
            <Form
                ref={this.formRef}
                className="ps-form__billing-info"
                onFinish={this.handleLoginSubmit}>
                {address && address.length ? (
                    <h3 className="ps-form__heading">Saved Address</h3>
                ) : null}

                <div className="ps-block--checkout-order">
                    {address && address.length
                        ? address.map((address) => (
                              <div
                                  className="row"
                                  style={{
                                      border: '1px solid',
                                      marginBottom: 10,
                                      padding: 10,
                                  }}>
                                  <div className="col-sm-4">
                                      <Radio
                                          checked={address.isDefaultAddress}
                                          onChange={() =>
                                              this.onDefaultAddressChange(
                                                  address
                                              )
                                          }>
                                          make default
                                      </Radio>
                                  </div>
                                  <div className="col-sm-6">
                                      {address.fullName}
                                  </div>
                                  <div className="col-sm-2">
                                      <span
                                          style={{ cursor: 'pointer' }}
                                          onClick={() =>
                                              this.onAddressEdit(address)
                                          }>
                                          <i className="icon-pencil mr-2"></i>
                                          Edit
                                      </span>
                                      <Popconfirm
                                          title="Are you sure to delete this address?"
                                          onConfirm={() =>
                                              this.deleteConfirm(address._id)
                                          }
                                          okText="Yes"
                                          cancelText="No">
                                          <span
                                              style={{
                                                  marginLeft: 5,
                                                  cursor: 'pointer',
                                              }}>
                                              <i className="icon-trash2 mr-2"></i>
                                              Delete
                                          </span>
                                      </Popconfirm>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>

                {/* <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="keep-update"
                        />
                        <label htmlFor="keep-update">
                            Keep me up to date on news and exclusive offers?
                        </label>
                    </div>
                </div> */}
                <h3 className="ps-form__heading">Shipping address</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <div style={{ display: 'none' }} className="form-group">
                            <Form.Item
                                name="_id"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </Form.Item>
                        </div>

                        <div className="form-group">
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter your full name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <div className="form-group">
                            <Form.Item
                                name="countryCode"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter country code',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="CountryCode"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="form-group">
                            <Form.Item
                                name="mobile"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter your mobile',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Mobile Number"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <Form.Item
                        name="streetAddress"
                        rules={[
                            {
                                required: false,
                                message: 'Enter an address!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="text"
                            placeholder="Address"
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        name="streetAddress2"
                        rules={[
                            {
                                required: false,
                                message: 'Enter an Street addrees2!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="text"
                            placeholder="Apartment, suite, etc. (optional)"
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        name="state"
                        rules={[
                            {
                                required: false,
                                message: 'Enter an State',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="text"
                            placeholder="Enter your state"
                        />
                    </Form.Item>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="city"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter a city!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="city"
                                    placeholder="City"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="zipcode"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Enter a postal oce!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="string"
                                    placeholder="Postal Code"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <Form.Item
                        valuePropName="checked"
                        name="isDefaultAddress"
                        rules={[
                            {
                                required: false,
                            },
                        ]}>
                        <Checkbox>Save this information for next time</Checkbox>
                    </Form.Item>
                </div>
                <div className="ps-form__submit">
                    <Link href="/account/shopping-cart">
                        <a>
                            <i className="icon-arrow-left mr-2"></i>
                            Return to shopping cart
                        </a>
                    </Link>
                    <div className="ps-block__footer">
                        <button type="submit" className="ps-btn">
                            Submit
                        </button>
                        {isAddressAvailable && (
                            <button
                                disabled={!isAddressAvailable}
                                style={{
                                    marginLeft: 5,
                                }}
                                onClick={this.onNextButtonClick}
                                className="ps-btn">
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </Form>
        );
    }
}

const connectStateToProps = (state) => {
    return {
        address: getSavedAddress(state),
    };
};

export default connect(connectStateToProps)(FormCheckoutInformation);
