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
    getSavedAddressSuccess,
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
            newAddress: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.dispatch(getSavedAddressRequest(true));
    }

    handleLoginSubmit = (values) => {
        const auctionId=Router.query?.id_;
        const { address } = this.props;
        const isAddressAvailable = Boolean(address && address.length);

        if (!this.state.newAddress && isAddressAvailable) {
            return this.onNextButtonClick();
        }
        const isEdit = Boolean(values._id);

        if (!isAddressAvailable) values.isDefaultAddress = true;

        this.props.dispatch(
            saveAddressRequest(values,auctionId, isEdit, () => {
                this.formRef.current.resetFields();
                this.setState({ newAddress: false });
            })
        );
    };

    onDefaultAddressChange = (address) => {
        this.setState({ newAddress: false });
        this.props.dispatch(setDefaultAddressRequest(address._id));
    };

    onAddressEdit = (address) => {
        this.setState({ edit: true, newAddress: true });
        this.formRef.current.setFieldsValue({
            ...address,
        });
    };

    handleOnNewAddressClose = (event) => {
        event.preventDefault();
        this.setState({ newAddress: false });
    };

    onNextButtonClick = () => {
        if (this.props.auctionProduct) {
            Router.push({
                pathname: '/account/payment-auction',
                query: { id_: this.props.auctionProduct._id },
            });
        } else {
            Router.push('/account/payment');
        }
    };

    deleteConfirm(addressId) {
        this.props.dispatch(setAddressDeleteRequest(addressId));
    }

    selectAddress = (index) => {
        const { address } = this.props;
        const clone = [...(address || [])].map((i) => ({
            ...i,
            selected: false,
        }));
        clone[index] = { ...clone[index], selected: true };
        this.props.dispatch(getSavedAddressSuccess(clone));
        this.setState({ newAddress: false });
    };

    render() {
        const { address, auctionProduct } = this.props;
        const isAddressAvailable = Boolean(address && address.length);

        const isSelectedAddressAvailable = address.find((i) => i.selected);

        const handleRadioCheck = (item) => {
            if (this.state.newAddress) return false;
            if (item.hasOwnProperty('selected') && isSelectedAddressAvailable) {
                return item.selected;
            }
            if (!isSelectedAddressAvailable) return item.isDefaultAddress;
        };

        return (
            <Form
                ref={this.formRef}
                className="ps-form__billing-info"
                onFinish={this.handleLoginSubmit}>
                {address && address.length ? (
                    <h3 className="ps-form__heading">Saved Address</h3>
                ) : null}

                {!isAddressAvailable ? null : (
                    <div className="ps-block--checkout-order">
                        {address && address.length
                            ? address.map((address, index) => (
                                  <div
                                      className="row border"
                                      style={{
                                          marginBottom: 10,
                                          padding: 10,
                                      }}>
                                      <div
                                          className="col-sm-8 d-flex"
                                          onClick={() =>
                                              this.selectAddress(index)
                                          }>
                                          <Radio
                                              style={{ pointerEvents: 'none' }}
                                              checked={handleRadioCheck(
                                                  address
                                              )}></Radio>
                                          {address.streetAddress || ''},{' '}
                                          {address.state || ''},
                                          {address.city || ''}
                                      </div>
                                      <div className="col-sm-4 d-flex justify-content-end">
                                          <span
                                              className={
                                                  address.isDefaultAddress
                                                      ? `badge badge-pill badge-success`
                                                      : ``
                                              }
                                              style={{ height: 15 }}
                                              onClick={() =>
                                                  address.isDefaultAddress
                                                      ? null
                                                      : this.onDefaultAddressChange(
                                                            address
                                                        )
                                              }>
                                              {address.isDefaultAddress
                                                  ? 'Default'
                                                  : 'Set default'}
                                          </span>

                                          <span
                                              style={{
                                                  cursor: 'pointer',
                                                  marginLeft: 10,
                                              }}
                                              onClick={() =>
                                                  this.onAddressEdit(address)
                                              }>
                                              <i className="icon-pencil mr-2"></i>
                                              Edit
                                          </span>
                                          <Popconfirm
                                              title="Are you sure to delete this address?"
                                              onConfirm={() =>
                                                  this.deleteConfirm(
                                                      address._id
                                                  )
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
                        <div
                            className="row border"
                            style={{
                                marginBottom: 10,
                                padding: 10,
                            }}>
                            <div className="col-sm-4">
                                <Radio
                                    checked={this.state.newAddress}
                                    onClick={() => {
                                        this.setState((prev) => ({
                                            newAddress: !prev.newAddress,
                                        }));

                                        this.formRef.current.setFieldsValue({
                                            isDefaultAddress: true,
                                        });
                                    }}>
                                    Other
                                </Radio>
                            </div>
                        </div>
                    </div>
                )}

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
                {(this.state.newAddress || !isAddressAvailable) && (
                    <>
                        <h3 className="ps-form__heading mt-5">
                            Shipping address
                        </h3>
                        <div className="row">
                            <div className="col-sm-12">
                                <div
                                    style={{ display: 'none' }}
                                    className="form-group">
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
                                    <label>*Full Name</label>
                                    <Form.Item
                                        name="fullName"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Enter your full name!',
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
                                    <label>*Area Code</label>
                                    <Form.Item
                                        name="countryCode"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter area code',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Area Code"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <div className="form-group">
                                    <label>*Mobile Number</label>
                                    <Form.Item
                                        name="mobile"
                                        rules={[
                                            {
                                                required: true,
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
                            <label>*Address Line 1</label>
                            <Form.Item
                                name="streetAddress"
                                rules={[
                                    {
                                        required: true,
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
                            <label>Address Line 2</label>
                            <Form.Item name="streetAddress2">
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Apartment, suite, etc. (optional)"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <label>*State</label>
                            <Form.Item
                                name="state"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please enter name of the state',
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
                                    <label>*City</label>

                                    <Form.Item
                                        name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter the name of city',
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
                                    <label>*Zip Code</label>
                                    <Form.Item
                                        name="zipcode"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter your zip code.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="string"
                                            placeholder="Zip Code"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        {isAddressAvailable ? (
                            <div className="form-group">
                                <Form.Item
                                    valuePropName="checked"
                                    name="isDefaultAddress"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}>
                                    <Checkbox>Make default Address</Checkbox>
                                </Form.Item>
                            </div>
                        ) : null}
                    </>
                )}

                <div className="ps-form__submit">
                    {!auctionProduct && (
                        <Link href="/account/shopping-cart">
                            <a>
                                <i className="icon-arrow-left mr-2"></i>
                                Return to shopping cart
                            </a>
                        </Link>
                    )}
                    <div className="ps-block__footer">
                        <button type="submit" className="ps-btn">
                            Next
                        </button>
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
