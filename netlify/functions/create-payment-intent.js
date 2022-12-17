
// Netlif will b default look inside a netlify folder on the root for a folder called functions.

// The name of the file will be the name of the route

// Note this is a backend code, we are not within create-react-app anymore. This is to be run as a serverless function (eg lamda function)
// need to npm i stripe dotenv

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }

  } catch (error) {
    console.log({error})

    return {
      statusCode: 400,
      body: JSON.stringify({error})
    }
  }
}
