import React, { Component } from "react"
import { notification, Spin, Row, Form, Input, TextArea } from "antd"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { CONFIG } from "./Config"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"

class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 1,
      checkoutCompleteProgress: false,
    }
  }

  handleChangePaymentMethod = e => {
    this.setState({ method: e.target.value })
  }

  handleCheckout = async (token, cardId, values) => {
    this.setState({ checkoutCompleteProgress: true })
    const customHeaders = {
      Accept: "application/json",
      "content-type": "application/json",
      "x-app-token": CONFIG["x-app-token"],
    }
    try {
      const request = await axios.post(
        `${CONFIG.base_url}/order/guest-checkout`,
        {
          email: values.email,
          address: values.address,
          name: values.name,
          quantity: 1,
          token,
          listingId: cardId,
          isCardSave: true,
        },
        {
          headers: customHeaders,
        }
      )
      this.setState({ checkoutCompleteProgress: false })

      if (request.data.success) {
        this.props.handleClose()
        notification.success({
          message: "Success!!",
          description: request.data.message,
          duration: 20,
        })
      } else {
        notification.error({
          message: "Failed",
          description: request.data.message,
          duration: 15,
        })
      }
    } catch (error) {
      notification.error({
        message: "Failed",
        description: `${error}`,
        duration: 15,
      })
    } finally {
      this.setState({ checkoutCompleteProgress: false })
    }
  }

  render() {
    let month = [],
      year = []
    for (let i = 1; i <= 12; i++) {
      month.push(i)
    }
    for (let i = 2019; i <= 2050; i++) {
      year.push(i)
    }

    // const { userInfo = {}, defaultAddress = {}, cart } = this.props
    const { cardId, price, handleClose } = this.props

    return (
      <div className="ps-checkout ps-section--shopping">
        <div className="container">
          <div className="ps-section__header">
            <h1>Payment</h1>
            <p style={{ color: "#fff" }}>You are purchasing as a guest</p>
          </div>
          <div className="ps-section__content">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 order-last order-lg-first">
                <div className="ps-block--shipping">
                  <div className="ps-block--payment-method">
                    <div className="ps-block__content">
                      <CheckoutForm
                        amount={price}
                        handleCheckout={this.handleCheckout}
                        cardId={cardId}
                        isCheckoutLoading={this.props.isCheckoutLoading}
                        checkoutCompleteProgress={
                          this.state.checkoutCompleteProgress
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Payment

const StripeHoc = WrappedComponent => props => {
  const stripePromise = loadStripe(
    "pk_live_51HDEqSDZO5dpgj2KAZjpfQZlTkAX9GP5tZ0wYweFUy9o0dT3wDn6Kua2Lb85vGJ16uBdPTQ7yIf09eqz6WJ8c47P00v4zXTGla"
  )
  return (
    <Elements stripe={stripePromise}>
      <WrappedComponent {...props} />
    </Elements>
  )
}

const CheckoutForm = StripeHoc(
  ({
    handleCheckout,
    isCheckoutLoading,
    amount,
    cardId,
    checkoutCompleteProgress,
  }) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async values => {
      // Block native form submission.

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement)

      // Use your card Element with other Stripe.js APIs
      const { error, token } = await stripe.createToken(cardElement)
      if (error) {
        notification.error({
          message: "Validation failed",
          description: error.message,
        })
      } else {
        handleCheckout(token.id, cardId, values)
      }
    }

    return (
      <>
        <Form onFinish={handleSubmit}>
          <div className="form-group">
            <Form.Item
              name="name"
              style={{ color: "red", backgroundColor: "#1890ff !important" }}
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  type: "string",
                },
              ]}
            >
              <Input
                className="form-control light"
                placeholder="Enter your name!"
                style={{
                  backgroundColor: "#121634",
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              style={{ color: "red" }}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                className="form-control light input-bacgroud-remain-primary"
                placeholder="Enter your email!"
                style={{
                  backgroundColor: "#121634",
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              style={{ color: "red" }}
              rules={[
                {
                  required: true,
                  message: "Please input your complete address!",
                  type: "string",
                },
              ]}
            >
              <Input.TextArea
                className="form-control light"
                placeholder="Enter your complete address!"
                autoSize={{ minRows: 3, maxRows: 5 }}
                style={{
                  backgroundColor: "#121634",
                }}
              />
            </Form.Item>

            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "20px",
                    border: "1px solid red",
                    iconColor: "#6EE4D6",
                    color: "#fff",
                    "::placeholder": {
                      color: "#fff",
                    },
                  },
                },
              }}
            />
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            {isCheckoutLoading ? (
              <Row align="middle" justify="center">
                <Spin size="large"></Spin>
              </Row>
            ) : !checkoutCompleteProgress ? (
              <button
                style={{ width: "100%", fontSize: "1.2rem", marginTop: "9px" }}
                className="submit-btn gradient-link px-3 py-3 nav-link text-center"
              >
                {`Pay $${amount}`}
              </button>
            ) : (
              <LoadingOutlined style={{ color: "#fff" }} />
            )}
          </div>
        </Form>
      </>
    )
  }
)

// export default CheckoutForm
