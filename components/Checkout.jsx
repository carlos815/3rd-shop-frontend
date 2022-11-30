import { loadStripe } from '@stripe/stripe-js';

import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import Button from './Buttons';
import './Checkout.module.css'

import styles from './Checkout.module.css'
import { useState } from 'react'
import NProgress from 'nprogress';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import { useRouter } from 'next/router';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import { USER_ORDERS_QUERY } from '../pages/orders';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const CHECKOUT_MUTATION = gql`
mutation CHECKOUT_MUTATION($token: String!) {
  checkout(token: $token) {
    id
  }
}
`

const CheckoutForm = ({ totalPrice }) => {

    const [checkout, { data, error: graphQLError }] = useMutation(CHECKOUT_MUTATION, { refetchQueries: [CURRENT_USER_QUERY, USER_ORDERS_QUERY] })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true)
        NProgress.start();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        console.log(paymentMethod.id)
        if (error) {
            setError(error);
            NProgress.done();
            return; // stops the checkout from happening
        }
        setLoading(false)

        const order = await checkout({
            variables: {
                token: paymentMethod.id,
            },
        });

        NProgress.done();
        router.push({

            pathname: "/orders",
            query: {
                id: order.id
            }
        })
        e.target.parentElement.parentElement.close()
    }
    return <form onSubmit={handleSubmit} disabled={loading} method="dialog"
        className="stripe-form  flex flex-col gap-3 " >
        <p>This checkout is handled by <Link className='underline' href="https://stripe.com/">Stripe
        </Link>, so it&apos;s safe AF</p>

        <CardElement className=' bg-yellow font-body p-4 rounded-lg font-bold   drop-shadow-lg' />
        <Button type='submit'>Pay ({formatMoney(totalPrice)})</Button>
    </form>
}

const Checkout = ({ totalPrice }) => {

    return <Elements stripe={stripeLib}>
        <CheckoutForm totalPrice={totalPrice} />
    </Elements>
}

export default Checkout

const PadlockIcon = () => <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="10.4848" width="16" height="11.1515" fill="currentColor" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87879 10.565C3.8503 10.5385 3.82206 10.5118 3.79409 10.4849H1.93939V6.12721L1.93939 6.12121L1.93939 6.11521V5.87879H1.94415C2.0714 2.64399 4.73401 0.0606079 8 0.0606079C11.266 0.0606079 13.9286 2.64399 14.0558 5.87879H14.0606V6.12121V10.4849H12.2059C12.1779 10.5118 12.1497 10.5385 12.1212 10.565L12.1212 10.4849V6.11555C12.1181 3.84207 10.2742 2 8 2C5.72392 2 3.87879 3.84513 3.87879 6.12121V10.565ZM7.99405 12.1818L8 12.1818L8.00595 12.1818H7.99405Z" fill="currentColor" />
</svg>
