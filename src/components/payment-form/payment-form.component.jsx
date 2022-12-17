import { useState, useContext } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'

import { PaymentFormContainer, FormContainer} from './payment-form.styles.jsx'
import './payment-form.styles.scss'


const PaymentForm = ({amount}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { currentUser } = useContext(UserContext)
  const [ isProcessingPayment, setIsProcessingPayment ] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessingPayment(true)

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount*100 })
    }).then(res=>res.json())

    const client_secret = response.paymentIntent.client_secret           // could have been destructured eg const { paymentIntent: {client_secret}} = response

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    })

    setIsProcessingPayment(false)

    if (paymentResult.error){
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert("payment successful")
      }
    }

  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button disabled={isProcessingPayment} buttonType='payNow'>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm